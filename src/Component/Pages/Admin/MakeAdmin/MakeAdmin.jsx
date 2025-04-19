import React, { useEffect } from "react";
import gravatarUrl from "gravatar-url";
import {
  useAdminAccessMutation,
  useAdminDeleteMutation,
  useGetAllAdminQuery,
} from "../../../../Redux/auth/authApi";

const MakeAdmin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [adminAccessFN, { isLoading: adminAccessIsLoading }] =
    useAdminAccessMutation();

  const [adminDeleteFN, { isLoading: adminDeleteIsLoading }] =
    useAdminDeleteMutation();

  const handleAddAndRemoved = (_id, isAdmin) => {
    if (isAdmin) {
      // removed admin
      adminDeleteFN({ _id });
    } else {
      // add admin
      adminAccessFN({ _id });
      console.log("enter");
    }
  };

  const { data, isLoading, isError, error } = useGetAllAdminQuery(undefined, {
    pollingInterval: 10000,
  });

  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>{error?.message}</div>;
  }
  if (!isLoading && data?.result) {
    content = data?.result.map((admin) => {
      let loading = false;
      const handleLoading = () => (loading = true);
      if (!adminAccessIsLoading) loading = false;

      return (
        <tr key={admin._id} className="bg-white border-b border-primary">
          <th
            scope="row"
            className="overflow-hidden h-full flex items-center justify-start px-2 md:px-4 py-2 md:py-2 text-gray-900 whitespace-nowrap"
          >
            {/* <img
              className="w-6 md:w-10 h-6 md:h-10 rounded-full"
              src={gravatarUrl(admin.email, { size: 200 })}
              alt="image"
            /> */}
            <div className="pl-3 text-base font-semibold whitespace-nowrap">
              {admin.name}
            </div>
          </th>
          <td className="overflow-hidden px-1 md:px-4 py-0.5 md:py-2 lowercase whitespace-nowrap">
            {admin.email}
          </td>
          <td className="overflow-hidden px-1 md:px-4 py-0.5 md:py-2 whitespace-nowrap ">
            <p className="">
              {admin.isVerify ? (
                admin.isAdmin ? (
                  "Admin"
                ) : (
                  "Panging"
                )
              ) : (
                <span className="px-1.5 py-0.5 bg-red-500 text-white rounded-md font-semibold">
                  Mail Not Verify
                </span>
              )}
            </p>
          </td>

          <td className="overflow-hidden px-1 md:px-4 py-0.5 md:py-2 text-center">
            <button
              disabled={
                !admin.isVerify || adminAccessIsLoading || adminDeleteIsLoading
              }
              onClick={() => {
                handleAddAndRemoved(admin._id, admin.isAdmin);
                handleLoading;
              }}
              type="button"
              className={`px-1 md:px-2 py-0.5 md:py-2 text-xs font-medium md:text-[15px] ${admin.isVerify
                ? admin.isAdmin
                  ? "bg-red-500"
                  : " bg-green-600"
                : "bg-gray-600"
                }  text-white font-semibold rounded-md`}
            >
              {admin.isAdmin ? "Removed Admin" : "Make Admin"}
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="rounded-[10px]">
      <div className="relative overflow-x-auto rounded-[10px]">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="p-2 md:p-4">
                <div className="flex items-center">Photo || Name</div>
              </th>
              <th scope="col" className="px-1 md:px-4 py-0.5 md:py-1.5">
                Email
              </th>
              <th scope="col" className="px-1 md:px-4 py-0.5 md:py-1.5">
                Status
              </th>
              <th
                scope="col"
                className="px-1 md:px-4 py-0.5 md:py-1.5 text-center"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
