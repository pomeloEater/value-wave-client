import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import mapSlice from 'slices/mapControlSlice';

const reducer = {
  mapControl: mapSlice,
};

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});