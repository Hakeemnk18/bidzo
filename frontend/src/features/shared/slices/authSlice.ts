import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    id: string | null,
    name: string | null,
    role: "admin" | "user" | "seller" | null,
    isAuthenticated: boolean
}

const initialState: AuthState = {
    id: null,
    name: null,
    role: null,
    isAuthenticated: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const { id, name, role } = action.payload;
            state.id = id;
            state.name = name;
            state.role = role;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.id = null,
            state.name = null,
            state.role = null,
            state.isAuthenticated = false
        }
    }

})

export const { login, logout } = authSlice.actions
export default authSlice.reducer