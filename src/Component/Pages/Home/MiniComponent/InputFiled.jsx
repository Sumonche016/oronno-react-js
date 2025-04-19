import React from 'react';

const InputFiled = ({ label, name, type, required }) => {
    return (
        <div className="">
            <div className='flex items-center mb-2'>
                <label
                    htmlFor={name}
                    className="text-[12px] font-semibold  text-[#5d6a7e] block"
                >

                    {label}

                </label>


            </div>
            <div className='flex items-start'>
                <input
                    required={required}
                    name={name}
                    id={name}
                    type={type}
                    className="border border-input text-gray-900 text-sm rounded-md focus:border-primary-green focus:outline-none block w-full p-2.5"
                />


            </div>
        </div >
    );
};

export default InputFiled;