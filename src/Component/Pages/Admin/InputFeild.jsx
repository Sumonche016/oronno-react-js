import React from 'react';

const InputFeild = ({ label, name, register, require, type }) => {
    return (
        <div>
            <label
                htmlFor={name}
                className="text-[0.875rem] mb-1 inline-block font-medium"
            >
                {label}
            </label>
            <input
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
                {...register(name, { required: require })}
                className="w-full font-medium px-[0.8125rem] py-[0.375rem]  form-control border rounded-[2px] h-8 border-input "
                type={type}
                id={name}

            />
        </div>
    );
};

export default InputFeild;