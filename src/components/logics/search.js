
import { getServiceObject, getCenter } from './map';
import { doGoogleMapSearchPromise } from '../logics/map';
import axios from 'axios'
import jsonp from 'axios-jsonp'

let searchStatus = 'READY';

export const trySearch = (keyword, useGoogle, useHotPepper) => {

    return new Promise((resolve, reject) => {


        if (searchStatus !== 'READY') {

            throw 'now searching';
        }
        searchStatus = 'BUSY';
        console.log(keyword + ':search start');
        let responseHotPepper, responseGoogle, promiseGoogle, promiseHotPepper;

        let req = {
            keyword: keyword,
            radius: 500,
            userLoc: getCenter()
        };

        if (!useGoogle && !useHotPepper)
            return;

        if (useHotPepper) {

            promiseHotPepper = axios.get(createHotPepperRequest(req), {
                adapter: jsonp
            }).then((response) => {

                responseHotPepper = perseHotPepperResults(response);

            });
        }

        if (useGoogle) {

            promiseGoogle = doGoogleMapSearchPromise(createGoogleRequest(req), getServiceObject()).then((response) => {

                responseGoogle = perseGoogleResults(response);

            }).catch((status) => {

                responseGoogle = perseGoogleResults(status);

            })
        }

        Promise.all([promiseGoogle, promiseHotPepper]).then((message) => {

            if (!useGoogle)
                responseGoogle = 'NO_RESULTS';

            if (!useHotPepper)
                responseHotPepper = 'NO_RESULTS';

            let res = combineResults(responseGoogle, responseHotPepper, req.userLoc);

            resolve(res);

        })
    })
}

export function createGoogleRequest(req) {

    let request = {

        location: req.userLoc,
        radius: req.radius,
        keyword: req.keyword,
        language: 'ja',
        type: 'restaurant',//only one type can be specified at once!! should i consider adding the other types like cafe and etcetc?? this can be achived by simply running the another search and add up results

    };

    return request;
}

export function createHotPepperRequest(req) {

    let apiKeyHotPepper = '1ff50644037f0f38';
    let lat = req.userLoc.lat();
    let lng = req.userLoc.lng();
    let keyword = req.keyword;
    const apiURL = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${apiKeyHotPepper}&lat=${lat}&lng=${lng}&count=100&range=3&keyword=${keyword}&order=4&format=jsonp`;

    return apiURL;
}

function similarity(str1, str2) {
    let longer = str1;
    let shorter = str2;
    if (str1.length < str2.length) {
        longer = str2;
        shorter = str1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(str1, str2) {

    let costs = [];
    for (let i = 0; i <= str1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= str2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (str1.charAt(i - 1) != str2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[str2.length] = lastValue;
    }
    return costs[str2.length];
}

export function combineResults(res1, res2, loc) {

    let results, status;
    let itemsShouldbeSpliced = [];

    let itemsShouldbeUnShifted = [];

    if (res1 === 'NO_RESULTS' && res2 === 'NO_RESULTS') {
        status = 'NO_RESULTS';
        results = [];
    } else if (res2 === 'NO_RESULTS') {
        status = 'DONE';
        results = res1;
    } else if (res1 === 'NO_RESULTS') {
        status = 'DONE';
        results = res2;
    } else {
        for (let i = 0; i < res1.length; i++) {
            for (let j = 0; j < res2.length; j++) {
                let sim = similarity(res1[i].name, res2[j].name);
                if (sim > 0.5) {
                    res1[i].hotpepper = res2[j].hotpepper;
                    itemsShouldbeSpliced.push(j);
                    itemsShouldbeUnShifted.push(i);
                    console.log("detected");
                }
            }
        }

        status = 'DONE';
        for (let i = 0; i < itemsShouldbeSpliced.length; i++) {

            res2.splice(itemsShouldbeSpliced[i], 1);
        }
        /*for (let i = 0; i < itemsShouldbeUnShifted.length; i++) {

            res1.unshift(res1[itemsShouldbeUnShifted[i]]);

            res1.splice(itemsShouldbeUnShifted[i+1], 1);
        }*/
        results = res1.concat(res2);
    }

    let res = {
        status: status,
        results: results,
        lat: loc.lat(),
        lng: loc.lng()
    }
    searchStatus = 'WAITING';
    let timeout = setTimeout(() => { searchStatus = 'READY' }, 3000);
    console.log(res);
    return res;

}

export function perseGoogleResults(results) {

    let result_temp = {};
    let parsedResults = [];

    if (results === 'ZERO_RESULTS') {

        return 'NO_RESULTS';

    }

    for (let i = 0; i < results.length; i++) {

        let result = results[i];
        result_temp = {};
        result_temp.name = result.name;
        result_temp.vicinity = result.vicinity;
        result_temp.rating = result.rating;
        result_temp.lat = result.geometry.location.lat();
        result_temp.lng = result.geometry.location.lng();
        result_temp.type = 1;
        result_temp.rat = result.user_ratings_total;
        result_temp.google = 'we_are_still_working_on_it.sry';
        result_temp.photo = result.photos[0].getUrl();

        /*axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.place_id}&key=AIzaSyC9qsxaC4dHG0ibEr9NMKC9Ddro_jdnMk8`, {
            adapter: jsonp
        }).then((response) => {

            console.log(response);
            result_temp.google = response.url;

        });*/

        //cors error occurs

        parsedResults.push(result_temp);
    }

    return parsedResults;

}


export function perseHotPepperResults(res) {

    let result_temp = {};
    let parsedResults = [];
    let results = res.data.results.shop;

    if (res.data.results.shop.length <= 0) {

        return 'NO_RESULTS';

    }

    for (let i = 0; i < results.length; i++) {

        let result = results[i];
        result_temp = {};
        result_temp.name = result.name;
        result_temp.vicinity = result.address;
        result_temp.rating = 5;
        result_temp.lat = result.lat;
        result_temp.lng = result.lng;
        result_temp.type = 2;
        result_temp.photo = result.photo.mobile.l;
        result_temp.hotpepper = `hotpepper.jp/str${result.id}`;
        parsedResults.push(result_temp);

    }

    return parsedResults;

}

