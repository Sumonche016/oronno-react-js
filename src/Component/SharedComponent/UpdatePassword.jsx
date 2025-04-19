import React, { useEffect, useState } from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useAdminPasswordUpdateMutation } from "../../Redux/auth/authApi";
import { useNavigate } from "react-router-dom";

const UpdatePassword = ({ resetEmail }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handle update password
  const [
    updatePasswordFN,
    { data: updatePassData, isLoading, isError, error: updatePassError },
  ] = useAdminPasswordUpdateMutation();

  //handle error and success
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    if (updatePassData?.success && !isLoading) {
      setUpdateError("");
      setUpdateSuccess(updatePassData?.message);
    }
    if (isError && !isLoading) {
      setUpdateSuccess("");
      setUpdateError(updatePassError?.data?.message);
    }
  }, [isLoading, isError, updatePassData]);

  //handle update password
  const [error, setError] = useState("");
  const handleChangePass = async (e) => {
    e.preventDefault();
    if (password < 8 || confirmPassword < 8) {
      setError("Password mast be 8 characters ");
      return;
    }
    if (password !== confirmPassword) {
      setError("password not match");
      return;
    }
    setError("");
    await updatePasswordFN({ email: resetEmail, password });
    setPassword("");
    setConfirmPassword("");
  };

  //update successful then navigate
  const navigate = useNavigate();
  useEffect(() => {
    if (updateSuccess && !updateError) {
      setTimeout(() => {
        navigate("/admin/login");
      }, [3000]);
    }
  }, [updateError, updateSuccess]);

  return (
    <div>
      <form onSubmit={handleChangePass}>
        <div className="mb-6 mt-10">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Confirm Password
          </label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Confirm Password"
            required
          />
        </div>
        {error && (
          <div className="text-base font-medium text-primary-red px-2">
            {error}
          </div>
        )}
        <div className="mb-6 mt-6">
          <button
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-primary-deep-green"
            } border border-primary-deep-green text-primary-white text-base font-semibold rounded-lg w-full p-2.5 `}
          >
            <div className="w-full flex justify-center items-center">
              Change Password <AiOutlineSwapRight className="ml-3 text-xl" />
            </div>
          </button>
        </div>
      </form>
      {updateError && (
        <div className="mb-6 px-3 py-2 bg-[#ffd6d6] text-[#ba2121] rounded-md font-medium">
          {updateError}
        </div>
      )}
      {updateSuccess && (
        <div className="mt-5 px-3 py-2 bg-[#bfffd2] text-[#08b241] rounded-md font-medium">
          Update successful Rendering...
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
