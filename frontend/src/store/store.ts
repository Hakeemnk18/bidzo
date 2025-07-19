import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../features/shared/slices/authSlice'

const store = configureStore({
    reducer:{
        auth: authSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store