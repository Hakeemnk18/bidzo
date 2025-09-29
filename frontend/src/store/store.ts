import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../features/shared/slices/authSlice'
import notificationSliceReducer from '../features/shared/slices/notificationSlice'

const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        notification: notificationSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store