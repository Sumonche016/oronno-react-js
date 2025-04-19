import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        adminLogin: (state, action) => {
            state.accessToken = action.payload.accessToken
        },
        adminLogout: (state) => {
            state.accessToken = ""
        },

    }
});

export const { adminLogin, adminLogout } = authSlice.actions;
export default authSlice.reducer;