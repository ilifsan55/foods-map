import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {appSlice} from '../../redux/appSlice';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {styled, alpha} from '@mui/material/styles';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import IconButton from '@mui/material/IconButton';
const Search = styled('div')(({theme}) => ({
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    'marginLeft': 0,
    'width': '55%',
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
}));
const StyledInputBase = styled(InputBase)(({theme})=> ({
    'color': 'inherit',
    'width': 'calc(100% - 48px)',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));
export default function SearchBox(props) {
    /*
    [props]
    onChangeMethod
    example
    requestUserLocMethod
    searchMethod
    */
    const dispatch = useDispatch();
    const inputValue = useSelector((state)=> state.app.inputValue);
    return (
        <Search>
            <SearchIconWrapper>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="search"
                    onClick={() => {
                        props.searchMethod();
                    }}
                >
                    <SearchIcon />
                </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
                onChange={(e) => {
                    dispatch(appSlice.actions.handleInputField(e.target.value));
                }}
                placeholder={props.example}
                value={inputValue}
                onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        props.searchMethod();
                    }
                }}
            />
            <IconButton
                size="large"
                edge="start"
                color="warning"
                aria-label="menu"
                onClick={() => {
                    props.requestUserLocMethod(true);
                }}
            >
                <MyLocationIcon />
            </IconButton>
        </Search>
    );
}
