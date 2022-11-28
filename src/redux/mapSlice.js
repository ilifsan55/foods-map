import {createSlice} from '@reduxjs/toolkit';
// Initial values of the state
const initState = {
    isUserLocRequested: false,
    searchResults: {
        results: [],
        status: 'INITIALIZED',
    },
    resultsListToggle: false,
};
// creating the slice
export const mapSlice = createSlice({
    name: 'mapSlice',
    initialState: initState,
    reducers: {
        requestUserLoc: (state, action) => {
            state.isUserLocRequested = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
            state.resultsListToggle = true;
        },
        setResultsListToggle: (state, action) => {
            state.resultsListToggle = !state.resultsListToggle;
        },
    },
    });
export default mapSlice;
