import React from 'react';
import paymentBD from '../../assets/img/payment-getway.png'
import shoppingBd from '../../assets/img/shipping-bd.png'
import charulataFooter from '../../assets/img/charulata-footer.png'
import { MdCopyright } from 'react-icons/md'
import {
    FaFacebookF,
    FaLinkedinIn,
    FaPinterest,
    FaTelegramPlane,
    FaTwitter,
} from "react-icons/fa";

const FooterBottom = () => {
    const socialRoute = [
        {
            bgColor: "bg-[#3b5998]",
            borderColor: "border-[#3b5998] ",
            icon: <FaFacebookF />,
        },
        {
            bgColor: "bg-[#00aff0]",
            borderColor: "border-[#00aff0] ",
            icon: <FaTwitter />,
        },

        {
            bgColor: "bg-[#bd081c]",
            borderColor: "border-[#bd081c] ",
            icon: <FaPinterest />,
        },
        {
            bgColor: "bg-[#0077b5]",
            borderColor: "border-[#0077b5] ",
            icon: <FaLinkedinIn />,
        },
        {
            bgColor: "bg-[#00405d]",
            borderColor: "border-[#00405d] ",
            icon: <FaTelegramPlane />,
        },
    ];
    // let url = 'https://charulata.green/wp-content/uploads/2022/06/charulata-footer.png';
    return (
        <footer className="">
            {/* divider */}
            <div className=' border-b-2 border-gray-200'></div>

            <div className="container py-8 grid grid-cols-2 mx-auto gap-x-3 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col w-full space-y-4">
                    <h2 className="font-medium">Payment System:</h2>
                    <div className="flex">
                        <img src={paymentBD} alt="" />
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-4">
                    <h2 className="font-medium">Shipping System:</h2>

                    <div className="flex">
                        <img src={shoppingBd} alt="" />
                    </div>
                </div>
                {/* col-3 socal links */}
                <div className="flex flex-col w-full space-y-4">
                    <h2 className="font-medium">Our Social Links:</h2>
                    <div>
                        <ul className="flex flex-row">
                            {socialRoute?.map((route, index) => (
                            <li key={index}
                                    className={`mr-3 w-7 h-7 border-[2px] border-gray-300 rounded-full flex justify-center items-center ${route.bgColor} ${route.borderColor} text-white hover:opacity-80 duration-150 ease-in-out cursor-pointer`}
                                >
                                    {route.icon}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>
            {/* divider */}
            <div className=' border-b-2 border-gray-200'></div>

            <div className="relative footer-bg-img bg-center flex items-center justify-center text-sm text-heading-gray">
                <small className='absolute bottom-3 flex items-center '>
                    <a className='text-heading-black' href="https://charulata.green/"><strong>Charulata</strong></a>
                    <MdCopyright className='mx-1 text-[.9rem] ' />
                    2023 all rights reserved
                </small>
            </div>

        </footer>
    );
};

export default FooterBottom;