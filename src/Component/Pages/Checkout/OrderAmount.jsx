import React from "react";

const OrderAmount = ({ totalPrice, deliveryCharge }) => {
  return (
    <div className="p-3 mt-6 font-medium ">
      <div>
        <div className="flex justify-between items-center mb-3">
          <p>মোট</p>
          <p>{totalPrice}</p>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-primary">
          <p>ডেলিভারি</p>
          <p>{deliveryCharge}</p>
        </div>
      </div>
      <div className="flex justify-between items-center pb-2 pt-1">
        <p>সর্বমোট</p>
        <p className="text-green-500">{totalPrice + deliveryCharge} ৳</p>
      </div>
    </div>
  );
};

export default OrderAmount;
