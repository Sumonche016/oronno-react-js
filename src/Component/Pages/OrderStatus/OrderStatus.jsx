import React, { useState } from "react";
import OrderStatusTable from "./MiniComponent/OrderStatusTable";

const OrderStatus = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const orders = [
    {
      id: 1,
      status: "Processing",
      placementDate: "2023-05-19",
      estimatedDeliveryDate: "2023-05-25",
      delivered: false,
    },
    {
      id: 2,
      status: "Delivered",
      placementDate: "2023-05-15",
      estimatedDeliveryDate: "2023-05-20",
      delivered: true,
    },
    // Add more orders as needed
  ];

  const handleClick = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); // Collapse the expanded order
    } else {
      setExpandedOrderId(orderId); // Expand the clicked order
    }
  };

  return (
    <div className="w-full container  mx-auto">
      <div className="w-full flex justify-between">
        <p className="py-2  text-start ps-3">Order ID</p>
        <p className="py-2  md:inline-block mx-10 hidden">Placement Date</p>
        <p className="py-2  md:inline-block mx-10 hidden">
          Estimated Delivery Date
        </p>
        <p className="py-2 ">Status</p>
        <p className="py-2 ">Delivered</p>
      </div>
      {orders?.map((order) => (
        <div
          key={order?.id}
          className=" mb-4 cursor-pointer"
          onClick={() => handleClick(order.id)}
        >
          <div className="w-full container border-2 border-primary  mx-auto">
            <table className="w-full  py-2 text-center ">
              <tr
                className=""
                key={order?.id}
                onClick={() => handleClick(order.id)}
              >
                <td className="py-2">{order.id}</td>
                <td className="py-2 md:inline-block hidden">
                  {order.placementDate}
                </td>
                <td className="py-2 lg:w-96 md:w-72 text-end md:inline-block hidden">
                  {order.estimatedDeliveryDate}
                </td>
                <td className="py-2 lg:w-64 md:text-start ">{order.status}</td>
                <td className="py-2 w-24">
                  {order?.delivered ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
              </tr>
            </table>

            {expandedOrderId === order.id && (
              <OrderStatusTable orders={orders} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
