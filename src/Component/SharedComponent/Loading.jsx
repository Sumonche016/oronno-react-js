import React from 'react';
import whiteLoadder from '../../assets/Images/whiteSpinner.gif'
const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center z-40">

            <img className="w-[130px] h-[130px]" src={whiteLoadder} alt="" />

        </div>
    );
};

export default Loading;