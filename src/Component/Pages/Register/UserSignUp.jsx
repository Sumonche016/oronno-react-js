import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import EmailModal from "../../SharedComponent/EmailModal";
import axios from "axios";
import googleImg from '../../../assets/Images/google.png'
import app from "../../../firebase/firebase.init";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { createUser } from "../../../Services/apiServices";

import { v4 as uuidv4 } from 'uuid';
import Loading from "../../SharedComponent/Loading";
const UserSignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false)
    const auth = getAuth(app);
    const [
        createUserWithEmailAndPassword,
        user,

        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // const response = axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/user/createUser`, { payload })


    const onSubmit = async (data) => {
        setLoading(true)
        await createUserWithEmailAndPassword(data.email, data.password)

        const payload = {
            user_name: data.name,
            user_email: data.email,
            user_password: data.password,
            user_id: uuidv4()
        }

        let response = await createUser(payload)
        if (response.data.success) {
            setLoading(false)
            toast.success('account created successfully')
        }
    };


    // create user api -> http://localhost:5000/user/createUser
    // get all user api-> http://localhost:5000/user/get-all
    // get single user> http://localhost:5000/user/get/4654
    const provider = new GoogleAuthProvider()
    const handleSignInWithGoogle = async () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user?.providerData[0];
                user && navigate("/")
                toast.success("User Created successfully")
            })
            .catch(err => {
                setErrorMessage(err);
            });

        // try {
        //   await firebase.auth().signInWithPopup(provider);
        //   history.push('/dashboard'); // Redirect to dashboard after successful login
        // } catch (error) {
        //   console.error(error);
        // }
    };




    if (loading) {
        return <Loading />
    }





    return (
        <div className="py-[5rem]">
            <div className="max-w-md mx-auto my-8 p-4 ">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name field */}
                    <div className="mb-4">
                        <label className="text-sm font-medium" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="border border-input text-gray-900 text-sm rounded-md focus:border-primary-green focus:outline-none block w-full p-2.5"
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>

                    {/* Email field */}
                    <div className="mb-4">
                        <label className="text-sm font-medium" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="border border-input text-gray-900 text-sm rounded-md focus:border-primary-green focus:outline-none block w-full p-2.5"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                        />

                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>

                    {/* Password field */}
                    <div className="mb-4">
                        <label className="text-sm font-medium" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border border-input text-gray-900 text-sm rounded-md focus:border-primary-green focus:outline-none block w-full p-2.5"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must have at least 6 characters",
                                },
                            })}
                        />
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>

                    {/* Retype Password field */}
                    <div className="mb-4">
                        <label className="text-sm font-medium" htmlFor="retypePassword">
                            Retype Password
                        </label>
                        <input
                            type="password"
                            id="retypePassword"
                            className="border border-input text-gray-900 text-sm rounded-md focus:border-primary-green focus:outline-none block w-full p-2.5"
                            {...register("retypePassword", {
                                required: "Retype Password is required",
                                validate: (value) =>
                                    value === document.getElementById("password").value || "Passwords do not match",
                            })}
                        />
                        {errors.retypePassword && (
                            <span className="text-red-500">{errors.retypePassword.message}</span>
                        )}
                    </div>
                    {
                        errorMessage && <p className="text-red-500">{errorMessage}</p>
                    }
                    {/* Submit button */}

                    <div className="my-5">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-deep-green hover:bg-primary-green focus:outline-none "
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-white group-hover:text-primary-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M11 0a1 1 0 0 1 .894.553l4 8a1 1 0 0 1-.447 1.342L12 11.414V19a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-7.586L4.553 9.895A1 1 0 0 1 4.106 8l4-8A1 1 0 0 1 9 0h2zm1 3.828L9.586 8H10a1 1 0 0 1 1 1v6h2v-6a1 1 0 0 1 1-1h.414l-2.707-5.415a.999.999 0 0 1-.579-.757z" />
                                </svg>
                            </span>
                            Sign Uppp
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        {/* <div className="flex items-center">
                           
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div> */}

                        <div className="text-sm">
                            <EmailModal></EmailModal>
                        </div>
                        <div className="text-sm flex">
                            <p className='px-1'>Already have a account? </p>
                            <span onClick={() => navigate("/login")} className="font-medium text-primary-deep-green hover:text-primary-green cursor-pointer">
                                login
                            </span>
                        </div>


                    </div>
                </form>
                <div className="mt-4">
                    <button
                        type="button"
                        className="relative  w-full border border-input bg-white flex justify-center items-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white    "
                        onClick={handleSignInWithGoogle}
                    >
                        <img src={googleImg} alt="" />

                        <h1 className='text-black ml-2'>Sign in with Google</h1>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSignUp;
