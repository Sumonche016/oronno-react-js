
import React from 'react';
import { Collapse } from 'react-collapse';

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const AccordianItem = ({ open, toggle, title, des }) => {
    return (
        <div className='pt-[20px] cursor-pointer'>
            <div onClick={toggle} className='bg-white md:py-[25px] p-4 md:px-[30px]  flex justify-between items-center'>
                <p className='md:text-[18px] font-semibold md:font-medium'>{title}</p>
                <div className='md:text-[30px] text-[25px]'>
                    {open ? <AiOutlineMinus className='text-red-500' /> : <AiOutlinePlus className='text-green-600' />}
                </div>
            </div>

            <Collapse isOpened={open}>
                <div className='bg-white md:px-[50px] p-4 md:pb-[20px]'>
                    {des}
                </div>
            </Collapse>
        </div>
    );
};

export default AccordianItem;