import React from "react";
import { useSelector } from "react-redux";
import { selectAllCartItem } from "../../../Redux/filter/selectFilter";
import { useGetManyProductByIdQuery } from "../../../Redux/filter/filterApi";

const OrderSummary = ({ setTotalPrice }) => {
  const allCurtItem = useSelector(selectAllCartItem);
  const allCurtIteId = allCurtItem?.map((obj) => obj.id);
  const { data, isError, isLoading, error } =
    useGetManyProductByIdQuery(allCurtIteId);
  const odderProductData = data?.data;

  let subTotal = 0;

  // desire what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div>{error?.message}</div>;
  }
  if (!isLoading && odderProductData) {
    content = odderProductData.map((product) => {
      const { _id, product_price, product_title } = product || {};
      const { value: quantity } = allCurtItem.find((p) => p.id == _id) || {};
      const totalPrice = quantity * product_price;
      subTotal += totalPrice;

      return (
        <tr key={_id} className="bg-white">
          <th
            scope="row"
            className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
          >
            {product_title}
          </th>
          <td className="px-6 py-4 font-medium">{quantity + " টি"} </td>
          <td className="px-6 py-4 font-medium">&#x9F3; {product_price}</td>
          <td className="px-6 py-4 font-medium  text-right">
            &#x9F3; {totalPrice}
          </td>
        </tr>
      );
    });
  }

  setTotalPrice(subTotal);

  return (
    <div >
      <div className="relative overflow-x-auto">
        <h3 className="label-text font-semibold text-[#334155] my-1">
          অর্ডার বিবরণী
        </h3>
        {/* <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-[5px] border-spacing-x-0">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                পণ্যের নাম
              </th>
              <th scope="col" className="px-6 py-3">
                পরিমাণ
              </th>
              <th scope="col" className="px-6 py-3">
                দাম
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                মোট দাম
              </th>
            </tr>
          </thead>
          <tbody >{content}</tbody>
        </table> */}
      </div>
    </div>
  );
};

export default OrderSummary;
