import React from "react";

const RelentedProductLoading = () => {
  return (
    <div className="flex justify-between px-3 py-2">
      <div className="flex">
        <div className="w-24 h-24 mr-3 skeleton rounded"></div>
        <div className="flex flex-col justify-evenly">
          <p className="skeleton h-4 rounded w-28"></p>
          <p className="skeleton h-3 rounded w-28"></p>
        </div>
      </div>
      <div className="flex flex-col justify-evenly items-end">
        <p className="skeleton h-3 rounded w-14"></p>
        <p className="skeleton h-6 rounded w-20"></p>
      </div>
    </div>
  );
};

export default RelentedProductLoading;
