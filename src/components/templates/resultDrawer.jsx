import React, { useEffect , useRef} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { mapSlice } from '../../redux/mapSlice';
import { width } from '@mui/system';
import ResultCard from './resultCard';
import { createMarker, deleteMarkers, deleteCircles,createCircle } from '../logics/map';
import { getMapObject } from '../logics/map';
import { getUserLocation } from '../parts/gMap';

export default function ResultDrawer(props) {

    let searchResults = props.results.results;
    let searchStatus = props.results.status;
    let lat = props.results.lat;
    let lng = props.results.lng;
    let userCircle;
    let resultsListToggle = useSelector(state => state.mapSlice.resultsListToggle);
    const drawerRef = useRef();
　　 console.log(searchResults);
    console.log(searchStatus);


    const scr = (amount) => {
        drawerRef.current.children[0].scrollTop = amount;
    }

    return (

        <Drawer
            anchor='left'
            open={resultsListToggle}
            variant="persistent"
            ref={drawerRef}
            PaperProps={{
                sx: {
                    marginTop: 8,
                    width: 400,
                    height: 'calc(100vh - 62px)'
                }
            }}
        >

            <Box>
                {(() => {
                    const d = [];
                    deleteMarkers();
                    deleteCircles();
                    
                    if(searchStatus == 'INITIALIZED'){

                        d.push(<ResultCard name='検索してみましょう' vicinity='😀' mode='noresults'></ResultCard>);
                        return d;

                    }

                    createCircle(lat,lng,1000);
                    if(searchStatus == 'NO_RESULTS'){

                        d.push(<ResultCard name='何も見つかりませんでした。' vicinity='🥺' mode='noresults'></ResultCard>);
                        return d;
                    }

                    
                    for (let i = 0; i < searchResults.length; i++) {
                        
                        let r = searchResults[i];

                        createMarker(r.lat,r.lng,i,scr,r.name);

                        d.push(<ResultCard 
                            key={i}
                            name={r.name} 
                            vicinity={r.vicinity} 
                            rating={r.rating} 
                            reviews={r.reviews}
                            mode='data'
                            eatfree={r.eatfree}
                            drinkfree={r.drinkfree}
                            parking={r.parking}
                            card={r.card}
                            rat={r.rat}
                            privateroom={r.privateroom}
                            google={r.google}
                            hotpepper={r.hotpepper}
                            lat={r.lat}
                            lng={r.lng}
                            photo={r.photo}
                            onClickFunc={(lat,lng) => 
                                {let loc = {
                                    lat: lat,
                                    lng: lng
                                };
                                let map = getMapObject();
                                map.panTo(loc);
                                map.setZoom(18);}}
                            ></ResultCard>);
                        
                    }
                    return d;
                })()}

            </Box>
        </Drawer>

    )


}



/*
   
            
*/
