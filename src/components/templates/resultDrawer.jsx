import React, {useRef} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {useSelector, useDispatch} from 'react-redux';
import {mapSlice} from '../../redux/mapSlice';
import ResultCard from './resultCard';
import {createMarker, deleteMarkers, deleteCircles, createCircle} from '../logics/map';
import {getMapObject} from '../logics/map';
export default function ResultDrawer(props) {
    const searchResults = props.results.results;
    const searchStatus = props.results.status;
    const lat = props.results.lat;
    const lng = props.results.lng;
    const dispatch = useDispatch();
    const resultsListToggle = useSelector((state) => state.mapSlice.resultsListToggle);
    const drawerRef = useRef();
    const scrollFunc = (amount) => {
        drawerRef.current.children[0].scrollTop = amount;
    };
    const openFunc = () =>{
        if (!resultsListToggle) {
            dispatch(mapSlice.actions.setResultsListToggle());
        }
    };
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
                    height: 'calc(100vh - 62px)',
                },
            }}
        >
            <Box>
                {(() => {
                    const d = [];
                    deleteMarkers();
                    deleteCircles();
                    if (searchStatus === 'INITIALIZED') {
                        d.push(<ResultCard name='検索してみましょう' key={0} vicinity='😀' mode='noresults'></ResultCard>);
                        return d;
                    }
                    createCircle(lat, lng, 1000);
                    if (searchStatus === 'NO_RESULTS') {
                        d.push(<ResultCard name='何も見つかりませんでした。' key={0} vicinity='🥺' mode='noresults'></ResultCard>);
                        return d;
                    }
                    for (let i = 0; i < searchResults.length; i++) {
                        const r = searchResults[i];
                        createMarker(r.lat, r.lng, i, scrollFunc, openFunc, r.name);
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
                            onClickFunc={(lat, lng) => {
                                    const loc = {
                                        lat: lat,
                                        lng: lng,
                                    };
                                    const map = getMapObject();
                                    map.panTo(loc);
                                    map.setZoom(18);
                                }}
                            ></ResultCard>);
                    }
                    return d;
                })()}
            </Box>
        </Drawer>
    );
}
