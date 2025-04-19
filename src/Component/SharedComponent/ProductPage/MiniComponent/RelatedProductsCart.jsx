import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCartItem } from "../../../../Redux/filter/selectFilter";
import useStoreProduct from "../../../../hooks/useStoreProduct";
import useRemoveCart from "../../../../hooks/useRemoveCart";
import { addToCart, removeToCart } from "../../../../Redux/filter/filterSlice";
import { useNavigate } from "react-router-dom";

const RelatedProductsCart = ({ product }) => {
  const { product_images, product_title, product_price, _id } = product || {};

  const allCurtItem = useSelector(selectAllCartItem);

  const [addCartStatus, setAddCartStatus] = useState(false);

  // check product already add to cart or not
  useEffect(() => {
    if (allCurtItem) {
      const findCartExist = allCurtItem?.find((item) => item.id == _id);
      if (findCartExist) {
        setAddCartStatus(true);
      }
      return;
    }
  }, []);

  const dispatch = useDispatch();
  const handleRemovedAndAddToCart = (e, id, price) => {
    e.stopPropagation();

    if (addCartStatus) {
      useRemoveCart(id);
      setAddCartStatus(false);
      dispatch(removeToCart({ _id: id }));
    }
    if (!addCartStatus) {
      useStoreProduct(id, price);
      dispatch(addToCart({ _id: id, price }));
      setAddCartStatus(true);
    }
  };

  // handle View product detail's
  const navigate = useNavigate();
  const vewProductDetails = (e) => {
    navigate(`/product/${_id}`);
  };

  const star = (
    <svg
      aria-hidden="true"
      className="w-3.5 h-3.5 text-yellow-800"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
  return (
    <div
      onClick={vewProductDetails}
      className="flex border cursor-pointer border-primary shadow-sm mt-5"
    >
      <div className="flex md:block items-center border-r border-primary">
        <div className="h-14 md:h-16 lg:h-24 w-14 md:w-16 lg:w-24 flex-shrink-0 overflow-hidden ">
          <img
            src={product_images}
            alt={product_title}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      <div className="p-3 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="overflow-hidden text-ellipsis">{product_title}</h3>
            <p className="ml-4 font-medium ">৳{product_price}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 flex items-center mb-2">
            {star}
            {star}
            {star}
            {star}
            {star}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-0.5 rounded ml-1.5 block md:hidden xl:block">
              5.0
            </span>
          </p>

          <button
            onClick={(e) => handleRemovedAndAddToCart(e, _id, product_price)}
            type="button"
            className={`focus:outline-none text-white font-medium rounded-md text-xs lg:text-sm px-2 md:px-3 py-1 md:py-1.5 mt-2 md:mt-0 ${
              addCartStatus
                ? "bg-red-500 hover:bg-red-500"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {addCartStatus ? "Remove cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductsCart;
