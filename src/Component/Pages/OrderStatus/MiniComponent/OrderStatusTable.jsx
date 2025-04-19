import React from 'react';

const OrderStatusTable = ({ orders }) => {

    return (
        <table className="w-full bg-blue-gray-200">
            <thead className=''>
                <tr>
                    <th className="py-2">SlNO</th>
                    <th className="py-2">Image</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">InFormation</th>
                    <th className="py-2">Price</th>
                </tr>
            </thead>
            <tbody>
                {orders?.map((order, index) =>
                    < tr className='border-b-2 py-2 mx-auto text-center border-primary' >

                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">Sourav</td>
                        <td className="py-2">Pro name</td>
                        <td className="py-2">Information about product</td>
                        <td className="py-2">100 $</td>
                    </tr>
                )}
            </tbody>
        </table >
    );
};

export default OrderStatusTable;
