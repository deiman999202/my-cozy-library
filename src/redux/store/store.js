import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web
import userSlice from '../slices/userSlice.js';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: sessionStorage
}

const persistedReducer = persistReducer(persistConfig, userSlice);

export default configureStore({
  reducer: {
    user: persistedReducer,
  },
});