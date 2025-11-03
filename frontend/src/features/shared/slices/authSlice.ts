import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types/user.types";


const initialState: AuthState = {
    name: null,
    role: null,
    bidCredit: 0,
    isAuthenticated: false,
    loading: true
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const {  name, role, bidCredit } = action.payload;
            state.name = name;
            state.role = role;
            state.bidCredit = bidCredit
            state.isAuthenticated = true;
            
        },
        logout: (state) => {
            state.name = null,
            state.role = null,
            state.isAuthenticated = false
            state.bidCredit = 0
        },
        authChecked: (state) => {
            state.loading = false
        }
    }

})

export const { login, logout, authChecked } = authSlice.actions
export default authSlice.reducer