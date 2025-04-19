import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Redux/api/apiSlice";
import productSlice from "../Redux/product/productSlice";
import cardSlice from "../Redux/card/cardSlice";
import authSlice from "../Redux/auth/authSlice";
import filterSlice from "../Redux/filter/filterSlice";
import odderSlice from "../Redux/odder/odderSlice";
import navSlice from "../Redux/nav/navSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        product: productSlice,
        card: cardSlice,
        auth: authSlice,
        filter: filterSlice,
        odder: odderSlice,
        nav: navSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)

})