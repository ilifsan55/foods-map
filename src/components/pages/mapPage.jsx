import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import MapView from '../views/mapView';

let vh;
let wd;

function setViewSize(){

    vh = window.innerHeight * 0.01;
    wd = window.innerWidth * 0.01;

    document.documentElement.style.setProperty('--wd', `${wd}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);

}


function MapPage() {

    useEffect(() => {

        function autoResize() {

            
            let x = window.innerWidth;
            let y = window.innnerHeight;
            if(x !== wd || y !== vh) {

                setViewSize();
                
            }

        }

        window.addEventListener('resize', autoResize);

    }, [])
    
    setViewSize();
    let appState = useSelector(state => state.app.appState);
    let drawElement;

    
    if (appState === 0) {

        drawElement = <MapView></MapView>

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