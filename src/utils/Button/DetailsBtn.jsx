import React from "react";

const DetailsBtn = (props) => {
  const { children, onClick } = props || {};
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-x border-secondary hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white"
    >
      {children}
    </button>
  );
};

export default DetailsBtn;
