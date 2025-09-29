import { createSlice } from "@reduxjs/toolkit";

export interface INotification {
    message: string;
}

interface NotificationState {
    list: INotification[];
}

const initialState: NotificationState = {
    list: [{ message: "Your plan has been upgraded to Pro." }],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.list.push(action.payload)
        },
        clearNotifications: (state) => {
            state.list = [{ message: "Your plan has been upgraded to Pro." }];
        },

    }
})

export const { addNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer
