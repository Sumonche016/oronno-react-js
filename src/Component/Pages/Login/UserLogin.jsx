import React, { useEffect, useState } from 'react';
import app from '../../../firebase/firebase.init';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import EmailModal from '../../SharedComponent/EmailModal';
import axios from 'axios';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import googleImg from '../../../assets/Images/google.png'
import { createUser } from '../../../Services/apiServices';


const UserLogin = () => {
    const auth = getAuth(app);

    const [signInWithGoogle, user] = useSignInWithGoogle(auth);

    const provider = new GoogleAuthProvider()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    // fetch current user


    // handel login
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential?.user;
                user && navigate("/") && toast.success("Successfully login")

            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(error)
                setErrorMessage(error.message);
            });
    };

    const handleSignInWithGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then(async result => {
                const user = result.user?.providerData[0];
                if (user) {
                    let payload = {
                        user_email: user.email,
                        user_name: user.displayName,
                        user_photo: user.photoURL,
                        user_id: user.uid
                    }

                    let response = await createUser(payload)
                    if (response.data.success) {
                        navigate("/")
                        toast.success("User Created successfully")
                    }
                }


            })
            .catch(err => {
                setErrorMessage(err);
            });
    };








    return (
        <div className="py-[5rem]">
            <div className=" flex items-center justify-center  ">
                <div className="max-w-md w-full space-y-8   p-4">
                    <div>
                        <h2 className="mt-6 text-center text-2xl font-semibold ">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">

                            <div className='my-3'>
                                <label htmlFor="email-address" className="text-[14px] font-semibold  text-[#5d6a7e] block my-2">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="border border-input text-gray-900 text-sm rounded-md focus:border-primary-green focus:outline-none block w-full p-2.5"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='my-3 relative'>
                                <label htmlFor="password" className="text-[14px] font-semibold  text-[#5d6a7e] block my-2">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="border border-input text-gray-900 text-sm rounded-md focus:border-primary-green focus:outline-none block w-full p-2.5"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    onClick={toggleShowPassword}
                                    type="checkbox"
                                    className="absolute right-2 top-11 h-4 w-4 bg-primary-green !text-primary-green !focus:bg-primary-deep-green  rounded"
                                />
                            </div>
                        </div>

                        {errorMessage && <p className="text-red-500">{errorMessage?.toString()}</p>}

                        <div className="flex items-center justify-between">
                            {/* <div className="flex items-center">
                           
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div> */}

                            <div className="text-sm">
                                <EmailModal />
                            </div>
                            <div className="text-sm flex">
                                <p className='px-1'>New to torulata? </p>
                                <span onClick={() => navigate("/signUp")} className="font-medium text-primary-deep-green hover:text-primary-green cursor-pointer">
                                    sign up
                                </span>
                            </div>
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-red \ "
                            >

                                Sign in
                            </button>
                        </div>

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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
