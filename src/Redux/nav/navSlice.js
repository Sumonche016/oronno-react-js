import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navOpen: false
}

const navSlice = createSlice({
    name: "odder",
    initialState,
    reducers: {
        navSwitch: (state, action) => {
            console.log("enter");
            if (action?.payload) {
                state.navOpen = action.payload
            } else {

                state.navOpen = !state.navOpen
            }
        }
    }
});

export const { navSwitch } = navSlice.actions;
export default navSlice.reducer;