import React from 'react';
import FooterMain from './MiniComponent/FooterMain';
import './FooterIndex.css'
import MainFooter from './MiniComponent/MainFooter';

const Footer = () => {
    return (
        <div className='!bg-white border-t border-primary'>
            <FooterMain />
            {/* <MainFooter /> */}


        </div>
    );
};

export default Footer;