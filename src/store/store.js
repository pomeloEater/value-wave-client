import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import mapSlice from 'slices/mapControlSlice';
import viewSlice from 'slices/viewControlSlice';

const reducer = {
  mapControl: mapSlice,
  viewControl: viewSlice,
};

export const store = configureStore({
  // middleware: getDefaultMiddleware => {
  //   process.env.NODE_ENV !== 'production'
  //     ? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
  //     : getDefaultMiddleware({ serializableCheck: false });
  // },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});
