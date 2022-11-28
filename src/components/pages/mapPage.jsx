import React from 'react';
import {useSelector} from 'react-redux';
import MapView from '../views/mapView';
function MapPage() {
    const appState = useSelector((state)=> state.app.appState);
    let drawElement;
    if (appState === 0) {
        drawElement = <MapView></MapView>;
    } else if (appState === 1) {
    } else if (appState === 2) {
    }
    return (
        <div className='App'>
            {drawElement}
        </div>
    );
}
export default MapPage;
