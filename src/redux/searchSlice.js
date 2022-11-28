import {createSlice} from '@reduxjs/toolkit';
// Initial values of the state
const initState = {
    useGoogle: true,
    useHotPepper: true,
};
// creating the slice
export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initState,
    reducers: {
        useGoogleToggle: (state, action) => {
            state.useGoogle = !state.useGoogle;
        },
        useHotPepperToggle: (state, action) => {
            state.useHotPepper = !state.useHotPepper;
        },
    },
    });
