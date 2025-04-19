import React from "react";
import "./loading.css";

const CartPageLoading = () => {
  return (
    <div className="flex justify-between w-full border border-primary shadow px-5 py-3 my-6">
      <div className="flex justify-start mr-4">
        <div className="w-16 h-16 skeleton" />
        <div className=" flex flex-col justify-between mt-3">
          <p className="w-28 ml-6 skeleton skeleton-text"></p>
          <p className="w-28 ml-6 skeleton skeleton-text"></p>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <p className="w-28 h-6 mb-i ml-16 skeleton skeleton-text"></p>
        <p className="w-28 h-6 mb-i ml-16 skeleton skeleton-text"></p>
        <p className="w-28 h-6 mb-i ml-16 skeleton skeleton-text"></p>
      </div>
    </div>
  );
};

export default CartPageLoading;
