import React, { useEffect } from "react";
import video from "../../../assets/video/video.mp4";
import logo from "../../../assets/Images/logo-green.png";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAdminLoginMutation } from "../../../Redux/auth/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../Redux/auth/selectAuth";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { register, handleSubmit, reset } = useForm();
  const [adminLoginFN, { data: loginData, isLoading, isError, error }] =
    useAdminLoginMutation();

  // handle login function
  const onSubmit = (data) => {
    adminLoginFN(data);
  };

  //handle error and success
  useEffect(() => {
    if (loginData && !isLoading) {
      reset();
      toast.success(loginData?.message?.toUpperCase());
    }
    if (isError && !isLoading) {
      toast?.error(error?.data?.message?.toUpperCase());
    }
  }, [loginData, isError, isLoading]);

  //user login true then navigate to dashboard
  const accessToken = useSelector(selectAccessToken);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken) {
      navigate(from, { replace: true });
    }
  }, [accessToken]);

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
                  Don't have an account?
                </p>
                <Link to="/admin/register">
                  <p className="px-3 py-1 bg-primary-gray rounded-md text-primary-deep-green">
                    Resister
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="name@flowbite.com"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your password
                    </label>
                    <input
                      {...register("password")}
                      autoComplete="off"
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <button className="bg-primary-deep-green border border-primary-deep-green text-primary-white text-base font-semibold rounded-lg w-full p-2.5 ">
                      <div className="w-full flex justify-center items-center">
                        Login <AiOutlineSwapRight className="ml-3 text-xl" />
                      </div>
                    </button>
                  </div>
                </form>
                <div className="flex justify-center">
                  <Link
                    to="/admin/reset-password"
                    className="text-primary-deep-green"
                  >
                    Forgotten password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
