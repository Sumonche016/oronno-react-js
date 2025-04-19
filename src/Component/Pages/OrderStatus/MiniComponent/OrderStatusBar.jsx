import React from 'react';

const OrderStatusBar = ({ currentStatus, placementDate, estimatedDeliveryDate }) => {
    const orderStatuses = [
        { id: 1, title: 'Order Placed' },
        { id: 2, title: 'Processing' },
        { id: 3, title: 'Shipped' },
        { id: 4, title: 'Delivered' },
    ];

    return (
        <div className="flex flex-col space-y-4">

            <div className="flex justify-between text-xs">
                <div>Placement Date: {placementDate}</div>
                {currentStatus >= 4 ? (
                    <div className="text-green-500">Delivered</div>
                ) : (
                    <div>Estimated Delivery Date: {estimatedDeliveryDate}</div>
                )}
            </div>
            <div className="flex space-x-2">
                {orderStatuses.map((status) => (
                    <div
                        key={status.id}
                        className={`flex-1 ${status.id <= currentStatus ? 'text-green-500' : 'text-gray-500'
                            }`}
                    >
                        <div
                            className={`h-2 rounded-lg ${status.id === currentStatus
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                                }`}
                        ></div>
                        <div className="text-xs text-center mt-1">{status.title}</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default OrderStatusBar;
