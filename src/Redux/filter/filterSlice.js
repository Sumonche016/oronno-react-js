import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    cart: [],
    totalPrice: 0,
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addSearchKeyword: (state, action) => {
            state.search = action.payload
        },
        addToCart: (state, action) => {
            const { _id, price } = action.payload || {}
            const allProducts = state.cart;
            const existProduct = allProducts?.find((p) => p.id == _id)
            if (existProduct) {
                const withoutExistProduct = allProducts?.filter((p) => p.id != _id)
                const newProduct = { id: _id, value: existProduct.value + 1, totalPrice: existProduct.totalPrice + price }
                const newData = [...withoutExistProduct, newProduct]
                state.cart = newData;
                state.totalPrice = state.totalPrice + price
                return
            }
            const setNewData = [...allProducts, { id: _id, value: 1, totalPrice: price }];
            state.cart = setNewData
            state.totalPrice = state.totalPrice + price
            return
        },
        removeToCart: (state, action) => {
            const { _id } = action.payload || {}
            const allProducts = state.cart;
            const withoutExistProduct = allProducts?.filter((p) => p.id != _id)
            const existProduct = allProducts?.find((p) => p.id == _id)
            state.cart = withoutExistProduct;
            state.totalPrice = state.totalPrice - existProduct.totalPrice
        },
        decrementToCart: (state, action) => {
            const { _id, price } = action.payload || {}
            const allProducts = state.cart;
            const existProduct = allProducts?.find((p) => p.id == _id)
            if (existProduct) {
                if (existProduct.value == 0) return;
                const withoutExistProduct = allProducts?.filter((p) => p.id != _id)
                const newProduct = { id: _id, value: existProduct.value - 1, totalPrice: existProduct.totalPrice - price }
                const newData = [...withoutExistProduct, newProduct]
                state.cart = newData;
                state.totalPrice = state.totalPrice - price
                return
            }

        },
        initializeCart: (state, action) => {
            const { cart, totalPrice } = action.payload || {}
            state.cart = cart
            state.totalPrice = totalPrice


        },

    }
});

export const { addSearchKeyword, addToCart, initializeCart, decrementToCart, removeToCart } = filterSlice.actions;
export default filterSlice.reducer;