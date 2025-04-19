import React, { useEffect } from "react";
import DeliveryAddress from "./DeliveryAddress";
import "./Checkout.css";

const Checkout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=' flex  justify-center items-center'>
      <DeliveryAddress />
    </div>
  );
};

export default Checkout;
