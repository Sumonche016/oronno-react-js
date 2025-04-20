import React, { useEffect, useState } from "react";
import video from "../../../assets/video/video.mp4";
import logo from "../../../assets/Images/logo-green.png";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../../ui/Error";
import { toast } from "react-toastify";
import { useAdminRegisterMutation } from "../../../Redux/auth/authApi";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../Redux/auth/selectAuth";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, reset } = useForm();

  const [
    adminRegisterFN,
    { data: registerData, isLoading, isError, error: errorMassage },
  ] = useAdminRegisterMutation();

  const [inputError, setInputError] = useState({});
  const [regSuccess, setRegSuccess] = useState(false);

  // show error and success hear
  useEffect(() => {
    if (registerData?.success) {
      toast.success(registerData?.message);
      setRegSuccess(true);
    }
    if (!errorMassage?.data?.success) {
      toast.error(errorMassage?.data?.message);
    }
  }, [registerData?.success]);

  //check user login
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  // submit function
  const onSubmit = async ({ name, email, password, confirmPassword }) => {
    setInputError({});
    // check password and confirmPassword not match
    if (password !== confirmPassword) {
      return setInputError({ password: "Password didn't match" });
    }
    const data = {
      name,
      email,
      password,
    };
    await adminRegisterFN(data);
    reset();
  };

  return (
    <div className="bg-primary-white">
      <div className="container mx-auto">
        {/* div wrap */}
        <div className="w-auto md:h-[calc(100vh_-_64px)] flex justify-center items-center box-border">
          <div className="flex flex-col md:flex-row w-full md:w-[60%] h-auto md:h-[75vh] bg-primary-gray rounded-lg shadow-lg mt-7 md:mt-0">
            {/* video section */}
            <div className="max-w-full min-h-full flex-1 shrink-0 rounded-lg overflow-hidden md:mr-1 relative">
              <video
                className="min-w-full min-h-full object-cover"
                src={video}
                autoPlay
                muted
                loop
              ></video>

              {/* have a account  */}
              <div className="absolute bottom-4 -translate-x-[50%] left-[50%] w-[90%] backdrop-blur-sm bg-white/30  flex justify-between items-center p-3 rounded">
                <p className="text-primary-white font-medium">
                  have an account?
                </p>
                <Link to="/admin/login">
                  <p className="px-3 py-1 bg-primary-gray rounded-md text-primary-deep-green">
                    Login
                  </p>
                </Link>
              </div>
            </div>

            {/* form section  */}
            <div className="flex-1 shrink-0 max-w-full min-h-full md:ml-1 p-3">
              {/* form header  */}
              <div>
                <img
                  className="w-40 h-auto mx-auto mt-4 mb-3"
                  src={logo}
                  alt="logo"
                />
                {/* <h3 className="md:text-xl font-semibold text-primary-text text-center  ">
                  তরুলতা নার্সারি সর্বদা আপনার পশে
                </h3> */}
              </div>

              <div className="max-w-[300px] mx-auto mt-5">
                {/* register form  */}
                {!regSuccess && (
                  <form className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label className="block mb-1.5 text-sm font-medium text-gray-900">
                        Your Name
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="type your name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1.5 text-sm font-medium text-gray-900">
                        Your email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@flowbite.com"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1.5 text-sm font-medium text-gray-900 ">
                        Password
                      </label>
                      <input
                        {...register("password")}
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block mb-1.5 text-sm font-medium text-gray-900 ">
                        Confirm Password
                      </label>
                      <input
                        {...register("confirmPassword")}
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      />
                      {inputError?.password && (
                        <Error massage={inputError.password} />
                      )}
                    </div>

                    <div className="mb-3 mt-6">
                      <button
                        disabled={isLoading}
                        className={`${
                          isLoading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-primary-deep-green"
                        } border border-primary-deep-green text-primary-white text-base font-semibold rounded-lg w-full p-2.5 `}
                      >
                        <div className="w-full flex justify-center items-center">
                          Resister{" "}
                          <AiOutlineSwapRight className="ml-3 text-xl" />
                        </div>
                      </button>
                    </div>
                  </form>
                )}

                {/* register successful */}
                {regSuccess && (
                  <div className="mt-12">
                    <FcOk className="text-6xl mx-auto mb-2" />
                    <h2 className="text-2xl font-semibold text-center capitalize">
                      your registration successfully done
                    </h2>
                    <p className="text-lg text-center my-3 font-medium text-primary-text">
                      please check your email and verify
                    </p>
                    <p className="text-lg text-center my-3 font-normal text-primary-text">
                      Go to{" "}
                      <span
                        onClick={() => setRegSuccess(false)}
                        className="text-primary-deep-green font-medium mt-2 cursor-pointer"
                      >
                        Register
                      </span>{" "}
                      page
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
