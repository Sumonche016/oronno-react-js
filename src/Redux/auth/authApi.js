import { apiSlice } from "../api/apiSlice";
import { adminLogin } from "./authSlice";
import Cookies from 'js-cookie';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoints write hear
        getAllAdmin: builder.query({
            query: () => ({
                url: "/admin/all-admin",
                method: "GET",
            })
        }),
        adminAccess: builder.mutation({
            query: (data) => ({
                url: "/admin/give-admin-access",
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted({ _id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData("getAllAdmin", undefined, (draft) => {
                        const updateDraft = draft?.result?.find(
                            (c) => c._id == _id
                        );
                        updateDraft.isAdmin = true
                    })
                )

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }


            }
        }),
        adminDelete: builder.mutation({
            query: (data) => ({
                url: "/admin/remove",
                method: "DELETE",
                body: data,
            }),
            async onQueryStarted({ _id }, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(apiSlice.util.updateQueryData("getAllAdmin", undefined, (draft) => {
                    const withOutRemovedAdmin = draft?.result.filter(singleAdmin => singleAdmin._id == _id)
                    draft.result = withOutRemovedAdmin
                }))

                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            }
        }),
        adminRegister: builder.mutation({
            query: (data) => ({
                url: "/admin/register",
                method: "POST",
                body: data,
            })
        }),
        adminEmailVerify: builder.mutation({
            query: (hash) => ({
                url: `/admin/email-verify/${hash}`,
                method: "PATCH",
            })
        }),
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `/admin/login`,
                method: "PATCH",
                body: data
            }),
            // set access token in cookie abd redux store
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data.result || {}
                    Cookies.set('accessToken', accessToken, { expires: 1, path: '/' })
                    dispatch(adminLogin({ accessToken }))

                } catch (err) {
                    // do nothing
                }
            },
        }),
        adminPasswordReset: builder.mutation({
            query: (email) => ({
                url: `/admin/password-reset`,
                method: "PATCH",
                body: email
            })
        }),
        adminOtpVerify: builder.mutation({
            query: ({ email, otp }) => ({
                url: `/admin/password-reset-verify/${email}/${otp}`,
                method: "PATCH",
            })
        }),
        adminPasswordUpdate: builder.mutation({
            query: (data) => ({
                url: `/admin/password-update`,
                method: "PATCH",
                body: data
            })
        }),
    }),
})

export const { useAdminRegisterMutation, useAdminEmailVerifyMutation, useAdminLoginMutation, useAdminPasswordResetMutation, useAdminOtpVerifyMutation, useAdminPasswordUpdateMutation, useGetAllAdminQuery, useAdminAccessMutation, useAdminDeleteMutation } = authApi