import React from 'react';
import logoImage from "../../../../assets/Images/logocrop-removebg-preview.png";
import Social from '../../../Pages/Home/MiniComponent/Social';

const MainFooter = () => {
    return (
        <div className='container mx-auto'>
            <div className='grid grid-cols-5 py-[77px]'>
                <div className='col-span-2'>
                    <img src={logoImage} className='w-[160px]' alt="" />
                    <div className='mt-4'>
                        <Social />
                    </div>
                </div>
                <div >
                    <h1> information</h1>
                </div>
                <div >
                    my account
                </div>
                <div >
                    contact info
                </div>
            </div>
        </div>
    );
};

export default MainFooter;