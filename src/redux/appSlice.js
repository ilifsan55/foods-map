import { createSlice } from '@reduxjs/toolkit';

// Initial values of the state
const appInitialState = {
    mainState: 0,
    appState: 0,
    mapResults: [],
    inputValue: '',
    wheelToggle:false

};

// creating the slice
export const appSlice = createSlice({
    name: 'app', 
    initialState: appInitialState,
    reducers: {
        setState: (state, action) => {
            state.mainState = action.payload;
        },
        setAppState: (state, action) => {
            state.appState = action.payload;
        },
        setResults: (state, action) => {
            state.mapResults = action.payload;
        },
        trySearch: (state,action)=>{
            state.searchRequest = action.payload;
        },
        handleInputField: (state,action) => {
            state.inputValue = action.payload;
        },
        toggleWheel: (state,action) => {

            state.wheelToggle = !state.wheelToggle;
        }
    },
});

export default appSlice;