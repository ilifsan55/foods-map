import {createSlice} from '@reduxjs/toolkit';

// Initial values of the state
const initState = {
    wheelState: 0,
    wheelRotation: 1800,
    wheelContents: ['ラーメン', 'カレー', 'ハンバーガー', '牛丼', 'そば', 'ドーナツ', 'うどん', '中華'],
};

// creating the slice
export const wheelSlice = createSlice({
    name: 'wheelSlice',
    initialState: initState,
    reducers: {
        setWheelState: (state, action) => {
            state.wheelState = action.payload;
        },
        setRotation: (state, action) => {
            state.wheelRotation = action.payload;
        },
        setContents: (state, action) => {
            state.wheelContents = action.payload;
        },
    },

    });

export default wheelSlice;
