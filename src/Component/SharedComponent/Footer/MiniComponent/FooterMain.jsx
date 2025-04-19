import React from 'react';
import logoImage from "../../../../assets/Images/logocrop-removebg-preview.png";

import instagramIcon from '../../../../assets/Images/insta.png'
import linkedinIcon from '../../../../assets/Images/linkedin.png'
import facebook from '../../../../assets/Images/facebook.png'
import whatsapp from '../../../../assets/Images/whatsapp.png'
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';



const FooterMain = () => {


    const socialRoute = [
        {

            icon: facebook,
            link: 'https://www.facebook.com/torulata24/'

        }, {

            icon: instagramIcon,
            link: 'https://www.instagram.com/torulata24/'
        },

        {
            icon: whatsapp,
            link: 'https://wa.me/+8801711258558'
        },

        {
            icon: linkedinIcon,
            link: 'https://www.linkedin.com/company/torulata/'
        },

    ];



    const navigate = useNavigate()


    const handleNavigateABout = () => {
        navigate('/about-us')
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }

    return (
        <div>
            <footer className="  bg-center border-t border-primary py-[3rem]">
                <div className="md:container w-[96%] mx-auto  flex flex-col md:flex-row gap-8">
                    <div className="md:mr-[2rem]  mr-0">
                        <div>
                            <img className=' text-center w-[12rem] md:w-[13rem] mx-auto' src={logoImage} alt="Charulata logo" />
                        </div>
                        <div className='md:mt-8 mt-4'>
                            <ul className="self-center md:gap-4 gap-2 flex items-center justify-center  ">
                                {socialRoute?.map((route, index) => (
                                    <li key={index}
                                        className={` w-8 h-8 border-[2px] border-gray-300 rounded-full flex justify-center items-center ${route.bgColor} ${route.borderColor} text-white  duration-150 ease-in-out cursor-pointer`}
                                    >
                                        <a target="_blank" rel="noopener noreferrer" href={route.link}>
                                            <img src={route.icon} alt="" />
                                        </a>

                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>


                    <div className='grid md:grid-cols-4 grid-cols-2 gap-16 justify-around w-full'>

                        <div className="flex flex-col space-y-4">
                            <h2 className="font-medium text-primary-black uppercase ">Opening time</h2>
                            <div className=' border-b-2 border-primary-green w-12 -pt-4'></div>
                            <div className="flex flex-col space-y-2 text-sm  ">
                                <a className='hover:text-primary-green py-1' rel="noopener noreferrer" href="#">Mon - Fri: 9AM - 11PM</a>
                                <a className='hover:text-primary-green py-1' rel="noopener noreferrer" href="#">Sat: 9AM - 8PM</a>

                            </div>
                            <p className='text-[1rem] mt-3 font-medium'>We works All The Holidays</p>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h2 className="font-medium text-primary-black uppercase ">Information</h2>
                            <div className=' border-b-2 border-primary-green w-12 -pt-4'></div>
                            <div className="flex flex-col space-y-2 text-sm  ">
                                <a onClick={handleNavigateABout} className=' cursor-pointer hover:text-primary-green py-1' rel="noopener noreferrer" >About Us</a>




                                <HashLink smooth className='hover:text-primary-green py-1' to='/#faq'>Frequently Questions</HashLink>


                            </div>
                        </div>

                        <div className="flex flex-col  space-y-4">
                            <h2 className="font-medium text-primary-black uppercase ">My Account</h2>
                            <div className=' border-b-2 border-primary-green w-12 -pt-4'></div>
                            <div className="flex flex-col space-y-2 text-sm  ">


                                <a className='hover:text-primary-green cursor-pointer py-1' rel="noopener noreferrer" onClick={() => navigate('/cart')}>Shopping cart</a>

                                {/* <a className='hover:text-primary-green py-1' rel="noopener noreferrer" href="#shop">Shop</a> */}

                                <HashLink smooth className='hover:text-primary-green py-1' to='/#shop'>Shop</HashLink>

                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h2 className="font-medium text-primary-black uppercase ">Customer Service</h2>
                            <div className=' border-b-2 border-primary-green w-12 -pt-4'></div>
                            <div className="flex flex-col space-y-2 text-sm  ">
                                <a className='hover:text-primary-green py-1' href="#contact-us">Contact Us</a>
                                <a className='hover:text-primary-green py-1' rel="noopener noreferrer" href="#">Terms of use</a>
                                <a className='hover:text-primary-green py-1' rel="noopener noreferrer" href="#">Privacy Policy</a>



                            </div>
                        </div>
                    </div>



                </div>

            </footer>

        </div>
    );
};

export default FooterMain;