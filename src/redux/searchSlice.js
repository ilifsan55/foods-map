import { createSlice } from '@reduxjs/toolkit';

// Initial values of the state
const initState = {
    isDetailBoxOpened : false,
    useGoogle : true,
    useHotPepper : true,
    privateroom : false,
    eatfree : false,
    drinkfree : false,
    card : false,
    parking : false
};

// creating the slice
export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initState,
    reducers: {
        detailBoxToggle: (state, action) => {
            state.isDetailBoxOpened = !state.isDetailBoxOpened;
        },
        useGoogleToggle: (state, action) => {
            state.useGoogle = !state.useGoogle;
            
        },
        useHotPepperToggle: (state, action) => {
            state.useHotPepper = !state.useHotPepper;
        },
        setHotPepperDetail: (state, action) => {
            state.parking = action.payload.parking;
            state.eatfree = action.payload.eatfree;
            state.drinkfree = action.payload.drinkfree;
            state.card = action.payload.card;
            state.privateroom = action.payload.privateroom;
        },
    }

    });
