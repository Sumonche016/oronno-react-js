import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import { BsWhatsapp } from 'react-icons/bs';

const Social = () => {
    return (
        <div>
            <ul className='flex gap-2'>
                <li className='cursor-pointer'> <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/torulata24/"><FaFacebookF /></a> </li>
                <li className='cursor-pointer'> <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/torulata/"><FaLinkedinIn /></a></li>
                <li className='cursor-pointer'><a target="_blank" rel="noopener noreferrer" href="https://wa.me/+8801711258558"><BsWhatsapp className='text-[14px]' /></a></li>
                <li className='cursor-pointer '><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/torulata24/"><AiOutlineInstagram /></a></li>
            </ul>
        </div>
    );
};

export default Social;