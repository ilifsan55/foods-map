let map;
let service;
let markers = [];
let circles = [];
const defaultUserLoc = {
    lat: 35.6809591,
    lng: 139.7673068,
};
export function initMap(element, userLoc) {
    console.log('Map Initialized');
    const map = new window.google.maps.Map(element, {
        center: userLoc,
        zoom: 15,
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
    const service = new window.google.maps.places.PlacesService(map);
    return service;
}
export function createMapInstance() {
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
export function createMarker(lat, lng, index, scrollFunc, openFunc, name) {
    const pixelOffset = new window.google.maps.Size(0, -40);
    const marker = new window.google.maps.Marker({
        map: map,
        position: {lat: lat, lng: lng},
        // label: name
    });
    marker.addListener('mouseover', () => {
    const hover = new window.google.maps.InfoWindow({
            map: map,
            content: name,
            noSuppress: true,
            zIndex: 20000,
           pixelOffset: pixelOffset,
        });
        hover.setPosition({lat: lat, lng: lng});
    });

    marker.addListener('mouseout', ()=> {
        if (hover) {
            hover.close();
        }
    });

    marker.addListener( 'click', ()=> {
        scrollFunc(index*316);
        openFunc();
    });
    markers.push(marker);
}
export function deleteMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}
export function deleteCircles() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].setMap(null);
    }
    circles = [];
}
export function createCircle(lat, lng, radius) {
    const circle = new window.google.maps.Circle({
        center: {lat: lat, lng: lng},
        fillColor: '#0000ff',
        fillOpacity: 0.15,
        map: map,
        radius: radius,
        strokeColor: '#0000ff',
        strokeOpacity: 1,
        strokeWeight: 1,
    });
    circles.push(circle);
}
export const getMapObject = ()=> {
    return map;
};
export const getCenter = ()=> {
    const latlng = map.getCenter();
    return latlng;
};
export const getServiceObject = () => {
    return service;
};
