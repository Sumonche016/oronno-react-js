import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    odderProduct: []
}

const odderSlice = createSlice({
    name: "odder",
    initialState,
    reducers: {

    }
});

export const { odderDataPrepare } = odderSlice.actions;
export default odderSlice.reducer;