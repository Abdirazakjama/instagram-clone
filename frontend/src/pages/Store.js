import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../Features/api/baseApiASlice';

import authSliceReducer from '../Features/appSlice/authSlice'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authSliceReducer
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});


export default store;