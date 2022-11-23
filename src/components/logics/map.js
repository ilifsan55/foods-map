let map,service;
let markers = [];
let circles = [];

let defaultUserLoc = {   
    lat: 35.6809591,
    lng: 139.7673068
};

export function initMap(element, userLoc) {
    console.log("Map Initialized");
    //create an actual gmap 
    let map = new window.google.maps.Map(element, {
        center: userLoc,
        zoom: 15
    });

    /*
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
    */

    return map;

}

export function initService(map) {

    let service = new window.google.maps.places.PlacesService(map);
    return service;
}

export function createMapInstance(){

    map = initMap(document.getElementById('map'), defaultUserLoc);
    service = initService(map);
    return map;
}

export function doGoogleMapSearchPromise(request, service) {

    return new Promise((resolve, reject) => {
        service.nearbySearch(request, (results, status) => {
            if (status === 'OK') {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });

}
export function createMarker(lat, lng, index, Func, name) {

    let marker = new window.google.maps.Marker({
        map: map,
        position: { lat: lat, lng: lng },
        //label: name
        
    });
    marker.addListener( "click", () =>  {
        Func(index*399);
    }  );
    markers.push(marker);

}

export function deleteMarkers () {

    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

export function deleteCircles () {

    for (let i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
}

export function createCircle(lat, lng,radius) {

    let circle = new window.google.maps.Circle({
        center: { lat: lat, lng: lng },
        fillColor: '#0000ff',
        fillOpacity: 0.15,
        map: map,
        radius: radius,
        strokeColor: '#0000ff',
        strokeOpacity: 1,
        strokeWeight: 1
    });

    circles.push(circle);
}



function getGooglePhotoPromise(ref) {
    let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${ref}&key=YOUR_API_KEY`;

}



export const getMapObject = () => {

    return map;

}

export const getCenter = () => {
    let latlng = map.getCenter();

    return latlng;
}


export const getServiceObject = () => {

    return service;

}

