import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {isLoggedIn: !!localStorage.getItem('token'), token: localStorage.getItem('token')};
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login (state,action){
            state.isLoggedIn = true;
            state.token = action.payload.token;
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('email',action.payload.email.replace(/[@.]/g, ""));
        },
    }
})

export const authAction = authSlice.actions;
export default authSlice;