import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AppSlice, { appSlice } from '../../redux/appSlice';
import mapSlice from '../../redux/mapSlice';
import { searchSlice } from '../../redux/searchSlice';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Checkbox from '@mui/material/Checkbox';
import SearchBox from '../parts/searchBox';

import Grid from '@mui/material/Grid';
import ResultDrawer from './resultDrawer'
import Wheel from '../parts/wheel'
import { GoogleIcon } from '../parts/googleIcon'
import { trySearch } from '../logics/search';
import { HotPepperIcon } from '../parts/hotPepperIcon'
import axios from 'axios'
import jsonp from 'axios-jsonp'
import { useTheme } from '@mui/material/styles';
import { auto } from '@popperjs/core';



let userLocation = {
  lat: 35.41221,
  lng: 139.4130
};

let searchResults;




const PartyButton = styled(Button)(({ theme }) => ({

  fontSize: '1.8rem',

  padding: theme.spacing(0, 0, 0, 0),
  textAlign: 'right',

}))

const SearchResultsElementMemo = React.memo(props => {
  return <ResultDrawer results={props.results}></ResultDrawer>;
});

const WheelElementMemo = React.memo(props => {
  return <Wheel trySearchFunc={props.trySearchFunc}></Wheel>;
});

export default function AppBarTemplate() {

  const inputValue = useSelector(state => state.app.inputValue);
  const searchResults = useSelector(state => state.mapSlice.searchResults);
  const useGoogle = useSelector(state => state.searchSlice.useGoogle);
  const useHotPepper = useSelector(state => state.searchSlice.useHotPepper);
  const dispatch = useDispatch();


  
  return (
    <div>
      <Box
        sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 100 }}
        >
          <Toolbar>
            <Grid 
              container 
              spacing={1}
              display="flex"
              justify="space-between">
            <Grid item xs={1} md={1}>
              <IconButton
                size="large"
                //edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => { dispatch(mapSlice.actions.setResultsListToggle()); }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs={5} md={5}>
              <SearchBox
                example="例："
                requestUserLocMethod={(bool) => { dispatch(mapSlice.actions.requestUserLoc(bool)); }}
                searchMethod={() => {
                 
                  trySearch(inputValue,useGoogle,useHotPepper)
                  .then((received) => (dispatch(mapSlice.actions.setSearchResults(received))))}}></SearchBox>
            </Grid>

            <Grid item xs={0} md={1}>
              
            </Grid>

            <Grid item xs={4} md={2}>
              <Checkbox
                value={useGoogle} onChange={() => (dispatch(searchSlice.actions.useGoogleToggle()))}
                icon={<GoogleIcon size={2} checked={false} />}
                checkedIcon={<GoogleIcon size={2} checked={true} />}
              />
              <Checkbox
                sx={{ ml: 3 }}
                value={useHotPepper} onChange={() => (dispatch(searchSlice.actions.useHotPepperToggle()))}
                icon={<HotPepperIcon size={2} checked={false} />}
                checkedIcon={<HotPepperIcon size={2} checked={true}
                />}
              />
            </Grid>

            <Grid item xs={0} md={1}>
              
            </Grid>


            <Grid item xs={1} md={1}>
              <PartyButton
                onClick={() => { dispatch(appSlice.actions.toggleWheel()) }}
                color="warning"
                variant="contained">🎯</PartyButton>
            </Grid>
            </Grid>

          </Toolbar>
        </AppBar>
      </Box>

      <SearchResultsElementMemo results={searchResults}></SearchResultsElementMemo>
      <WheelElementMemo trySearchFunc={() => {
                  trySearch(inputValue,useGoogle,useHotPepper)
                  .then((received) => (dispatch(mapSlice.actions.setSearchResults(received))))}}></WheelElementMemo>
    </div>
  );
}
