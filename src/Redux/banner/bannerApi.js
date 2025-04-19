import { apiSlice } from "../api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
    tagTypes: ['Banner'],
    endpoints: (builder) => ({
        //endpoints write hear
        getAllBanner: builder.query({
            query: () => ({
                url: `/banner`,
                method: "GET",
            }),
            providesTags: ['Banner'],
        }),

        addBanner: builder.mutation({
            query: (data) => ({
                url: `/banner/add`,
                method: "POST",
                body: { url: data }
            }),
            invalidatesTags: ['Banner'],

            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                console.log("object", data);
                dispatch(apiSlice.util.updateQueryData("getAllBanner", undefined, (draft) => {
                    draft.result.push(data.result)
                }))
            }
        }),
        deleteBanner: builder.mutation({
            query: (_id) => ({
                url: `/banner/delete/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Banner'],
            async onQueryStarted(_id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(apiSlice.util.updateQueryData("getAllBanner", undefined, (draft) => {
                    draft.result = draft.result.filter(s => s._id != _id)
                }))
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),


    }),
})

export const { useGetAllBannerQuery, useAddBannerMutation, useDeleteBannerMutation } = bannerApi