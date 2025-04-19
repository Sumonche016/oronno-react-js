import React from 'react';
import spinner from '../../assets/Images/button-loader.gif'

const SaveButton = ({ loading, onClick, tittle, disabled, type, form, background }) => {
    return (
        <button style={{ backgroundColor: background }} onClick={onClick} disabled={disabled} className='button-background text-white  h-[32px] px-[12px] rounded-sm text-[13px] mt-2' type={type} form={form}>
            {
                loading ? <img className='max-w-[55px] max-h-[55px]' src={spinner} alt="" /> : tittle
            }

        </button>
    );
};

export default SaveButton;

