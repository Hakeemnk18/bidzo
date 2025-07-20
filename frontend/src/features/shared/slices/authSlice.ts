import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types/user.types";


const initialState: AuthState = {
    name: null,
    role: null,
    isAuthenticated: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const {  name, role } = action.payload;
            state.name = name;
            state.role = role;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.name = null,
            state.role = null,
            state.isAuthenticated = false
        }
    }

})

export const { login, logout } = authSlice.actions
export default authSlice.reducer