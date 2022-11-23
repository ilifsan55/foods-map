import './base.css';
import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { setState, setRotation, setContents, setResults, setScrollAmount } from './redux/appSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const apikey = 'AIzaSyC9qsxaC4dHG0ibEr9NMKC9Ddro_jdnMk8'; // the apikey of GoogleMap™️
let map, service, request;
let nearbyResults;

let countofSpins = 0;

const wheelContents_solo = ['ラーメン', 'カレー', 'ハンバーガー', '牛丼', 'そば', 'ドーナツ', 'うどん', '中華'];
const wheelContents_party = ['焼肉', '回転寿司', 'イタリアン', 'ハンバーガー', '中華', '和食', 'ラーメン', 'インド料理'];

let wheelContents = wheelContents_solo;

const colorCode = ['#FF6961', '#FFb480', '#F8f38d', '#42d6a4', '#08cad1', '#59adf6', '#9d94ff', '#c780e8'];
const wheelRadius = 200; // in px

let hasUserLocation = false;
let userLocation = {
    lat: 35.41221,
    lng: 139.4130
};
let drawElement;

const getUserLocation = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
})


function App() {

    let mainState = useSelector(state => state.reducer.mainState);

    if (!hasUserLocation) {
        let prm = getUserLocation.then(function (value) {

            userLocation = {
                lat: value.coords.latitude,
                lng: value.coords.longitude
            };
            hasUserLocation = true;

        }).catch(function (value) {

            hasUserLocation = false;

        });
    }

    if (mainState == 0 || mainState == 1) {

        drawElement = <DrawWheel></DrawWheel>;

    } else if (mainState == 2) {

        drawElement = <DrawResult userLoc={userLocation}></DrawResult>;
    }

    return (
        <div className='App'>
            {drawElement}
        </div>
    );
}

function DrawWheel() {

    let wheelRotation = useSelector(state => state.reducer.wheelRotation);
    let mainState = useSelector(state => state.reducer.mainState);
    let wheelContents = useSelector(state => state.reducer.wheelContents);
    const dispatch = useDispatch();

    //ルーレット描画用＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

    let styleObjectArray = [];
    let degreePerContents = 360 / wheelContents.length;
    let polygon = Math.tan(3.14 / wheelContents.length);
    let sizeofEdge = polygon * wheelRadius;

    wheelContents.forEach((value, index) => {

        let colorCode_temp = colorCode[index]
        if (colorCode_temp == undefined) {
            colorCode_temp = '#FFFFFF';
        }

        let style = {
            'borderWidth': `200px ${sizeofEdge}px 0`,
            'transformOrigin': `${sizeofEdge}px 200px`,
            'left': `${wheelRadius - sizeofEdge}px`,
            'transform': `rotate(${(index) * degreePerContents}deg)`,
            'borderColor': `${colorCode_temp} transparent`
        }

        styleObjectArray.push(style);
    })

    //ここまで＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

    const WheelSpin = () => {

        if (mainState == 1) {
            //the Whell is runnning!
            return;
        }

        countofSpins++;
        let newSpin = 5000 * countofSpins;
        let rndSpin = Math.floor(Math.random() * (360)) + 1;
        let intervalID = setTimeout(() => { dispatch(setState(2)); }, 10000)
        dispatch(setRotation(newSpin + rndSpin));
        dispatch(setState(1));

    }

    const setToSolo = () => {
        dispatch(setContents(wheelContents_solo));
    }
    const setToParty = () => {
        dispatch(setContents(wheelContents_party));

    }

    return (
        <div id='wrapper'>
            <div id='buttonholder'>
                <span onClick={setToSolo} id='button-1'>一人で</span>
                <span onClick={setToParty} id='button-2'>みんなで</span>
            </div>
            <div id='tri'></div>
            <div id='wheel' onClick={WheelSpin}>
                <div id='inner-wheel' style={{
                    transform: `rotate(${wheelRotation}deg)`,
                }}>
                    {wheelContents.map((value, index) => <div style=
                        {styleObjectArray[index]}
                        key={index}
                        id={`content${index}`}>
                        <span>{value}</span></div>)}
                </div>
                <div id='mid-wheel' >
                </div>
            </div>
            <div id='text_position'>
                <span>位置情報を取得します。取得された情報は付近のレストランを検索するためだけに使用されます。</span>
            </div>
        </div>
    )
}

function DrawResult(props) {

    let wheelRotation = useSelector(state => state.reducer.wheelRotation);//ルーレットの回転角度を取得

    let resultDegree = wheelRotation % 360;
    let degreePerContent = 360 / wheelContents.length;
    resultDegree -= degreePerContent / 2;
    let result = 'Error';
    let radius = 500;

    const dispatch = useDispatch();

    resultDegree = 360 - resultDegree;

    let temp = resultDegree / degreePerContent;

    temp = Math.floor(temp);
    result = wheelContents[temp];

    const PlayAgain = () => {

        dispatch(setState(0));

    }
    return (
        <div id='wrapper'>
            <div id='buttonholder'>
                <span onClick={PlayAgain} id='button-1'>もう一度やる</span>
            </div>
            <div id='resultholder'>
                <span id='showresult'>おいしい{result}を食べよう</span>
            </div>
            <div id='mainwrapper'>
                <GMap radius={radius} result={result} userLoc={props.userLoc}></GMap>
                <MapResult />
            </div>
        </div >
    );
}

function GMap(props) {

    let dispatch = useDispatch();
    useEffect(() => {

        initMap(document.getElementById('map'), props.userLoc, props.radius);

        request = {
            location: props.userLoc,
            radius: props.radius,
            keyword: [props.result],
            type: 'restaurant',

        };
        getPlace(request).then((response) => {
            let res = resultsController(response);
            dispatch(setResults(res));
        }).catch((status) => {
            dispatch(setResults(resultsController(0)));
        }
        );
    })
    return (
        <div style={{}} id='map'></div>
    )
}

function MapResult() {

    let mapResults = useSelector(state => state.reducer.mapResults);

    return (

        <div id='resultsholder'>
            <div id='resultwindow'>
                {mapResults.map((value, index) => <div
                    className='resultcard'
                    onClick={(index) => {

                        map.setZoom(18);
                        let latlng = {
                            lat : value.lat,
                            lng : value.lng

                        }
                        map.setCenter(latlng);

                    }}
                    key={index}
                    id={`content${index}`}>
                    
                    <div>
                        <div className='resultindex'>{index+1}</div>
                    </div>
                    <div>
                        <div className='resulttext'>{value.name}</div>
                        <div className='resultvic'>{value.vicinity}</div>
                        <div className='resultrating'>{
                            (() =>{
                                let str = '';
                                for(let i = 1;i < value.rating; i++){
                                    str+='☆';
                                }
                                return <span>{str}</span>
                            })()
                        }</div>
                    </div>
                    </div>)}
                    
            </div>
        </div>
    )
}


function initMap(element, userLoc, radius) {
    //google mapを実際に作成する
    map = new window.google.maps.Map(element, {
        center: userLoc,
        zoom: 15
    });
    //検索機能を利用するためにgoogle placeを作成
    service = new window.google.maps.places.PlacesService(map);

    //ユーザーの位置及び検索範囲を描画
    let circle = new window.google.maps.Circle({
        center: userLoc,
        fillColor: '#ff0000',
        fillOpacity: 0.2,
        map: map,
        radius: radius*2,
        strokeColor: '#ff0000',
        strokeOpacity: 1,
        strokeWeight: 1
    });
    let userpos = new window.google.maps.Circle({
        center: userLoc,
        fillColor: '#0000ff',
        fillOpacity: 0.45,
        map: map,
        radius: 20,
        strokeColor: '#0000ff',
        strokeOpacity: 1,
        strokeWeight: 1
    });

}


function getPlace(request) {
    return new Promise((resolve, reject) => {
        service.nearbySearch(request, (results, status) => {
            if (status === 'OK') {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
};


function resultsController(results) {

    let newResults = [];
    if (results == 0 || results.length <= 0) {

        let result_temp = {};
        result_temp.name = '何も見つかりませんでした。';
        result_temp.vicinity = '';
        result_temp.rating = '';
        newResults.push(result_temp);
        return newResults;

    }
    for (let i = 0; i < results.length; i++) {

        let result_temp = {};
        let result = results[i];
        CreateMarker(result, i+1);

        result_temp.name = result.name;
        result_temp.vicinity = result.vicinity;
        result_temp.rating = result.rating;
        result_temp.lat = result.geometry.location.lat();
        result_temp.lng = result.geometry.location.lng();
        newResults.push(result_temp);
    }

    return newResults;

}

function CreateMarker(place, index) {

    let marker = new window.google.maps.Marker({
        map: map,
        label: String(index),
        position: place.geometry.location
    });

}


export default App;