import { apiSlice } from "../api/apiSlice";

export const filterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints write hear
        getSearchProduct: builder.query({
            query: (searchKeyword) => ({
                url: `/api/v1/product/get-search-product/search?search=${searchKeyword}`,
                method: "GET",
            })
        }),
        getManyProductById: builder.query({
            query: (data) => ({
                url: `/api/v1/product/findManyById/${data}`,
                method: "GET",

            })
        }),
    }),
})

export const { useGetSearchProductQuery, useGetManyProductByIdQuery } = filterApi