import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../../../Redux/filter/filterSlice";
import useStoreProduct from "../../../hooks/useStoreProduct";
import { useNavigate } from "react-router-dom";
import useRemoveCart from "../../../hooks/useRemoveCart";
import { selectAllCartItem } from "../../../Redux/filter/selectFilter";
import { toast } from "react-toastify";

const SingleProductCart = ({ product }) => {
  const { product_images, product_price, product_title, _id } = product || {};

  const ratingComponent = (
    <div className="flex items-center">
      <svg
        aria-hidden="true"
        className="w-3 h-3 sm:w-4 sm:h-5 text-[#ffb503]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>First star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg
        aria-hidden="true"
        className="w-3 h-3 sm:w-4 sm:h-5 text-[#ffb503]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Second star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg
        aria-hidden="true"
        className="w-3 h-3 sm:w-4 sm:h-5 text-[#ffb503]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Third star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg
        aria-hidden="true"
        className="w-3 h-3 sm:w-4 sm:h-5 text-[#ffb503]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Fourth star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      <svg
        aria-hidden="true"
        className="w-3 h-3 sm:w-4 sm:h-5 text-[#ffb503]"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Fifth star</title>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
    </div>
  );

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

  // handle View product detail's
  const vewProductDetails = (e) => {
    console.log(e.currentTarget.id);
    navigate(`/product/${_id}`);
  };

  // handle add to cart
  const handleAddToCart = (e, id, price) => {
    e.stopPropagation();
    // console.log("add to cart");
    dispatch(addToCart({ _id: id, price }));
    useStoreProduct(id, price);
    setAddCartStatus(true);
    toast.success("successfully added to cart");
  };

  // handle removed to cart
  const handleRemovedToCart = (e, id) => {
    e.stopPropagation();
    // console.log("removed to cart");
    dispatch(removeToCart({ _id: id }));
    useRemoveCart(id);
    setAddCartStatus(false);
  };

  return (
    <div className="w-full ">
      <div
        onClick={vewProductDetails}
        id="singleProductCart"
        className="border border-primary  max-w-[17.5rem]  rounded-[7px] hover:shadow-md overflow-hidden bg-white md:p-4 p-2 cursor-pointer  mx-auto"
      >
        <div className="h-[10rem] sm:h-[15rem] overflow-hidden relative">
          <img
            className="object-fill w-full h-full scale-105 hover:scale-100 ease-out duration-300 cursor-pointer"
            src={product_images}
            alt={product_title}
          />
          {/* <div className="px-1 py-[1px] sm:px-1.5 sm:py-0.5 rounded-sm bg-[#3ab559] absolute top-3 right-3 z-20 text-white text-xs sm:text-sm font-medium">
            New
          </div> */}
        </div>
        <div className="px-3 pt-2">
          {/* name and rating */}
          <div className=" text-sm sm:text-lg md:text-[1rem] ">
            <h3 className="truncate">{product_title}</h3>

            {/* <div className="flex">
              {ratingComponent}
    
            </div> */}
          </div>
          {/* price and add to cart button  */}
          <div className="my-2 flex justify-between items-center">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#777777]">
                Price
              </p>
              <div className="flex items-center justify-start">
                <p className="text-sm sm:text-lg font-medium text-[#095723]">
                  &#2547; {product_price}{" "}
                </p>
                <del className="text-xs hidden sm:text-sm  text-[#777777] font-medium ml-1">
                  &#2547;800
                </del>
              </div>
            </div>
            <div>
              <button
                onClick={(e) =>
                  !addCartStatus
                    ? handleAddToCart(e, _id, product_price)
                    : handleRemovedToCart(e, _id)
                }
                className="px-3  py-1.5 border border-input rounded-[5px]  text-xs sm:text-sm font-medium  hover:bg-[#095723] hover:text-white duration-100 ease-in-out"
              >
                {!addCartStatus ? "Add to cart" : "Remove cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCart;
