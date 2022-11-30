import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {appSlice} from '../../redux/appSlice';
import mapSlice from '../../redux/mapSlice';
import {searchSlice} from '../../redux/searchSlice';
import {styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Checkbox from '@mui/material/Checkbox';
import SearchBox from '../parts/searchBox';
import ResultDrawer from './resultDrawer';
import Wheel from '../parts/wheel';
import {GoogleIcon} from '../parts/googleIcon';
import {trySearch} from '../logics/search';
import {HotPepperIcon} from '../parts/hotPepperIcon';
const PartyButton = styled(Button)(({theme}) => ({
  fontSize: '1.8rem',
  padding: theme.spacing(0, 0, 0, 0),
  textAlign: 'right',
  marginLeft: 'auto',
}));
const SearchResultsElementMemo = React.memo((props) => {
  return <ResultDrawer results={props.results}></ResultDrawer>;
});
const WheelElementMemo = React.memo((props) => {
  return <Wheel trySearchFunc={props.trySearchFunc}></Wheel>;
});
export default function AppBarTemplate() {
  const inputValue = useSelector((state) => state.app.inputValue);
  const searchResults = useSelector((state) => state.mapSlice.searchResults);
  const useGoogle = useSelector((state) => state.searchSlice.useGoogle);
  const useHotPepper = useSelector((state) => state.searchSlice.useHotPepper);
  const dispatch = useDispatch();
  return (
    <div>
      <Box>
        <AppBar
          position="static"
          sx={{zIndex: (theme) => theme.zIndex.drawer + 100}}
        >
          <Toolbar>
              <IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  dispatch(mapSlice.actions.setResultsListToggle());
                }}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <SearchBox
                example="例："
                requestUserLocMethod={(bool) => {
                  dispatch(mapSlice.actions.requestUserLoc(bool));
                }}
                searchMethod={() => {
                  trySearch(inputValue, useGoogle, useHotPepper)
                  .then((received) => (dispatch(mapSlice.actions.setSearchResults(received)))).catch();
                  }}></SearchBox>
              <Checkbox
                value={useGoogle} onChange={() => (dispatch(searchSlice.actions.useGoogleToggle()))}
                icon={<GoogleIcon size={2} checked={false} />}
                checkedIcon={<GoogleIcon size={2} checked={true}/>}
                sx={{ml: 5}}
                edge="start"
              />
              <Checkbox
                sx={{ml: 5}}
                value={useHotPepper} onChange={() => (dispatch(searchSlice.actions.useHotPepperToggle()))}
                icon={<HotPepperIcon size={2} checked={false} />}
                checkedIcon={<HotPepperIcon size={2} checked={true}/>}
                edge="start"
              />
              <PartyButton
                onClick={() => {
                  dispatch(appSlice.actions.toggleWheel());
                }}
                color="warning"
                edge="start"
                variant="contained">🎯</PartyButton>
          </Toolbar>
        </AppBar>
      </Box>
      <SearchResultsElementMemo results={searchResults}></SearchResultsElementMemo>
      <WheelElementMemo trySearchFunc={(res) => {
                  trySearch(res, useGoogle, useHotPepper)
                  .then((received) => (dispatch(mapSlice.actions.setSearchResults(received))));
                  }}></WheelElementMemo>
    </div>
  );
}
