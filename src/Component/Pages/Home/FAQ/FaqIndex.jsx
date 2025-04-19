import React from 'react';
import FaqLottie from './MiniComponent/FaqLottie';
import Accordian from './MiniComponent/Accordian';

const FaqIndex = () => {
    return (
        <div id='faq' className='py-[5rem]'>
            <div className='md:container mx-auto w-[95%]'>
                <div className='text-center mb-8'>
                    <h1 className="text-2xl md:text-3xl text-primary-text font-medium pb-1 md:pb-3">সাধারন জিজ্ঞাসা</h1>
                    <div className="my-border-1 mx-auto w-[10rem] px-10 mt-[-2px]"></div>
                </div>
                <div className='md:w-[70%] w-[90%] mx-auto'>
                    <div><Accordian /></div>

                </div>
            </div>
        </div>
    );
};

export default FaqIndex;