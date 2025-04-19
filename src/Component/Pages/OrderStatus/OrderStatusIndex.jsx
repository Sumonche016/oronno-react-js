import React, { useEffect } from "react";
import OrderStatusBar from "./MiniComponent/OrderStatusBar";
import OrderStatusTable from "./MiniComponent/OrderStatusTable";
import OrderStatus from "./OrderStatus";

const OrderStatusIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto h-[100vh]">
      {/* <div className='w-full'>

                <OrderStatusBar
                    currentStatus={currentStatus}
                    placementDate={placementDate}
                    estimatedDeliveryDate={estimatedDeliveryDate}
                />
            </div> */}
      <h2 className="text-3xl text-center my-8 text-semibold uppercase">
        My orders
      </h2>
      <div className="w-full">
        <OrderStatus />
      </div>
    </div>
  );
};

export default OrderStatusIndex;
