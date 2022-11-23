import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MapPage from './pages/mappage';
import './main.css'

let hasUserLocation = false;
let userLocation = {
    lat: 35.41221,
    lng: 139.4130
};

function App() {

    let appState = useSelector(state => state.app.appState);
    let drawElement;

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

    if (appState == 0) {

        drawElement = <MapPage userLoc={userLocation}></MapPage>;

    } else if (appState == 1) {


    } else if (appState == 2) {

    }

    return (
        <div className='App'>
            {drawElement}
        </div>
    );
}



const getUserLocation = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
})


export default App;