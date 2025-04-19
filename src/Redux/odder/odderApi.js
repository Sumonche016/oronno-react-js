import { apiSlice } from "../api/apiSlice";

export const odderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints write hear
        newOdder: builder.mutation({
            query: (data) => ({
                url: "/odder/new-odder",
                method: "POST",
                body: data,
            })
        }),

        allOdder: builder.query({
            query: () => ({
                url: "/odder",
                method: "GET",
            })
        }),
        updateOrderStatus: builder.mutation({
            query: (data) => ({
                url: `/odder/update-order/${data.id}/${data.status}`,
                method: "PUT",

            }),
            async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("allOdder", undefined, (draft) => {
                        const updateDraft = draft?.data?.find(
                            (c) => c._id == id
                        );
                        updateDraft.order_status = status
                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }


            }
        })


    }),
})

export const { useNewOdderMutation, useAllOdderQuery, useUpdateOrderStatusMutation } = odderApi