import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints write hear
        addProduct: builder.mutation({
            query: (data) => ({
                url: "/api/v1/product/fetchProducts",
                method: "POST",
                body: data,
            })
        }),
        addReview: builder.mutation({
            query: ({ productID, updatedData }) => ({
                url: `api/v1/product/addReview/${productID}`,
                method: "PUT",
                body: updatedData,
            }),
            async onQueryStarted({ productID, updatedData }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getSingleProduct", productID, (draft) => {
                        draft?.reviews?.product_review.push({ ...updatedData, _id: productID, name: updatedData?.user_name, review: updatedData?.product_review, date: Date.now() })

                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }


            }
        }),
        editProduct: builder.mutation({
            query: ({ productID, updatedData }) => ({
                url: `${productID}`,
                method: "PUT",
                body: updatedData,
            })
        }),
        deleteProduct: builder.mutation({
            query: (productID) => ({
                url: `api/v1/product/deleteProduct/${productID}`,
                method: "DELETE",
            })
        }),
        getAllProduct: builder.query({
            query: () => ({
                url: "/api/v1/product/fetchProducts",
                method: "GET",
            })
        }),
        getSingleProduct: builder.query({
            query: (productId) => {
                return ({
                    url: `/api/v1/product/singleProduct/${productId}`,
                    method: "GET",
                })
            }
        }),
        getProductByCategory: builder.query({
            query: (queryParameter) => {
                const category = queryParameter?.category || ""
                const limit = queryParameter?.limit || 0
                const skip = queryParameter?.skip || 0
                return ({
                    url: `/api/v1/product/findByProductCategory?category=${category}&limit=${limit}&skip=${skip}`,
                    method: "GET"
                })
            }
        }),
        getRelatedProduct: builder.query({
            query: (productCategory) => ({
                url: `/api/v1/product/related-product?category=${productCategory}`,
                method: "GET",
            })
        }),
        getHotProduct: builder.query({
            query: () => ({
                url: "/api/v1/product/hot-product",
                method: "GET",
            })
        }),

    }),
})

export const { useAddProductMutation, useEditProductMutation, useDeleteProductMutation, useGetAllProductQuery, useGetRelatedProductQuery, useGetSingleProductQuery, useGetProductByCategoryQuery, useAddReviewMutation,useGetHotProductQuery } = productApi