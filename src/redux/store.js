import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {appSlice} from './appSlice';
import {mapSlice} from './mapSlice';
import { searchSlice } from './searchSlice';
import {wheelSlice} from './wheelSlice';

export const store = configureStore({
    reducer: combineReducers({
      app: appSlice.reducer,
      mapSlice:mapSlice.reducer,
      wheelSlice:wheelSlice.reducer,
      searchSlice:searchSlice.reducer,
    }),
  });

export default store;
