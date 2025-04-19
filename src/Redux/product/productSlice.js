import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProduct: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        allProduct: (state, action) => {
            state.allProduct = action.payload
        }
    }
});

export const { allProduct } = productSlice.actions;
export default productSlice.reducer;