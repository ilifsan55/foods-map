import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import mapSlice from '../../redux/mapSlice';
import {createMapInstance} from '../logics/map';
import AppBar from '../templates/appBar';
import Gmap from '../parts/gMap';

let shouldMapInitialize = true;
let map;
let userLoc;
export default function MapView() {
    const dispatch = useDispatch();
    const isUserLocRequested = useSelector((state) => state.mapSlice.isUserLocRequested);
    useEffect(() => {
        if (shouldMapInitialize) {
            map = createMapInstance();
            shouldMapInitialize = false;
        }
        if (isUserLocRequested) {
            getUserLocationPromise.then((value) => {
                userLoc = {
                    lat: value.coords.latitude,
                    lng: value.coords.longitude,
                };
                console.log('user loc obtained');
                map.setZoom(15);
                map.panTo(userLoc);
            }).catch((value) => {
                console.log('unable to obtain the user position');
            }).finally(() => {
                dispatch(mapSlice.actions.requestUserLoc(false));
            });
        }
    });
    return (
        <div id="page">
            <AppBar></AppBar>
            <Gmap></Gmap>
        </div>
    );
}
export const getUserLocationPromise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
});
