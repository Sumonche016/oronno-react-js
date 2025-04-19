import React, { useEffect, useState } from "react";
import { CgShare } from "react-icons/cg";
import { BiLink } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useRemoveCart from "../../../../hooks/useRemoveCart";
import { selectAllCartItem } from "../../../../Redux/filter/selectFilter";
import useStoreProduct from "../../../../hooks/useStoreProduct";
import { addToCart, removeToCart } from "../../../../Redux/filter/filterSlice";

const ProductCard = ({ setIsOpen, price, productImage, productTitle, _id }) => {
  //get this page location
  const carnetPageLocation = window.location.href;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(carnetPageLocation);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // handle add to cart
  const handleAddToCart = (e, id, price) => {
    e.stopPropagation();
    dispatch(addToCart({ _id: id, price }));
    useStoreProduct(id, price);
    setAddCartStatus(true);
  };

  // handle removed to cart
  const handleRemovedToCart = (e, id) => {
    e.stopPropagation();
    // console.log("removed to cart");
    dispatch(removeToCart({ _id: id }));
    useRemoveCart(id);
    setAddCartStatus(false);
  };

  const star = (
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-yellow-800"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );

  return (
    <div className="mt-10 md:mt-0 max-w-[20rem] bg-white border border-primary-black rounded-lg shadow-md">
      <img
        className="rounded-t-lg w-[300px] h-[300px] border-2 border-primary"
        src={productImage}
        alt="alovara"
      />
      <div className="px-5 pb-5">
        <div className="flex justify-between">
          <h5 className="text-lg my-2 font-semibold tracking-tight text-gray-900">
            {productTitle}
          </h5>
          <div className="flex gap-x-2 text-xl my-3.5">
            <CgShare
              onClick={() => setIsOpen(true)}
              className="cursor-pointer hover:text-primary-deep-green duration-100 ease-out"
            />
            <BiLink
              onClick={copyToClipboard}
              className="cursor-pointer hover:text-primary-deep-green duration-100 ease-out"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {star}
            {star}
            {star}
            {star}
            {star}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 rounded 0 ml-1.5">
              5.0
            </span>
          </div>
          <div className="flex justify-end">
            <p className="bg-blue-100 text-blue-800 text-xs font-semibold mr-1 px-2 rounded ">
              0
            </p>
            <p className="text-xs font-semibold mr-2">Reviews</p>
          </div>
        </div>

        {/* add to cart  */}
        <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex items-center justify-center">
            <button
              onClick={(e) =>
                !addCartStatus
                  ? handleAddToCart(e, _id, price)
                  : handleRemovedToCart(e, _id)
              }
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-sm text-sm px-5 py-2.5 mr-2"
            >
              {!addCartStatus ? "Add to cart" : "Remove cart"}
            </button>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.me/+8801711258558"
            >
              <button
                type="button"
                className="focus:outline-none text-white bg-Whatsapp hover:bg-green-800 focus:ring-1 focus:ring-[#bfbfbf] font-medium rounded-sm text-2xl px-2 py-2 mr-2"
              >
                <FaWhatsapp />
              </button>
            </a>
          </div>
          <div className="text-2xl font-semibold text-primary-text">
            ৳ {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
