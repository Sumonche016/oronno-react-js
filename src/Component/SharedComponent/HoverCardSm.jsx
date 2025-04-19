import React, { useEffect, useState } from "react";
import {
  BsCartCheck,
  BsCartCheckFill,
  BsCartX,
  BsFillCartCheckFill,
} from "react-icons/bs";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllCartItem } from "../../Redux/filter/selectFilter";
import { addToCart, removeToCart } from "../../Redux/filter/filterSlice";
import useRemoveCart from "../../hooks/useRemoveCart";
import useStoreProduct from "../../hooks/useStoreProduct";
import { FaCross } from "react-icons/fa";
import { BiCross } from "react-icons/bi";
import { CgCrop, CgCross, CgRemove } from "react-icons/cg";
import { MdRemove, MdRemoveDone } from "react-icons/md";
import { toast } from "react-toastify";

const HoverCardSm = ({ product, hidden }) => {
  const {
    product_images,
    product_price,
    product_title,
    product_discount,
    _id,
  } = product || {};

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
    console.log("click");
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
    toast.success("successfully remove from cart");

  };

  let discountPrice = product_price - (product_price * product_discount) / 100;




  return (
    <div onClick={vewProductDetails} className="bg-[#fff] p-4 w-full rounded-[5px] border border-primary  relative card-parent overflow-hidden">
      {/* card container */}
      <div className="card-container ">
        <div cursor-pointer className="overflow-hidden    cursor-pointer">
          <img className="" src={product_images} alt="" />
        </div>
        {/* star ratting */}
        <div className={`overflow-hidden  text-center pt-[20px]`}>
          <div className={`text-center flex items-center justify-center ${hidden ? "" : ""}`}>
            {ratingComponent}
          </div>
          <h1 className="my-[5px] font-semibold truncate">{product_title}</h1>
          <h1 className="text-primary-green  font-semibold">
            {" "}
            <span className="px-2">
              {discountPrice ? discountPrice + ".00৳" : ""}
            </span>{" "}
            <del className="text-primary-black text-[.9rem]">
              {discountPrice !== product_price ? product_price + ".00৳" : ""}
            </del>{" "}
          </h1>
        </div>
      </div>
      {/*  top icon for discount */}
      <div className="bg-primary-red  text-primary-white absolute  left-1  top-1 ">
        <div className="flex px-3">
          <div className="w-[30px] h-[30px] flex justify-center items-center text-[1rem] cursor-pointer  z-20 text-white text-xs sm:text-sm font-medium">
            {product_discount && product_discount
              ? "-" + product_discount + "%"
              : "Hot"}
          </div>
        </div>
      </div>
      {/*  bottom icon for curt */}
      <div className="bg-[#fff] overflow-hidden hover absolute left-0 right-0 mx-auto w-[80%] bottom-[5rem]  sm-cart-icons">
        <div className="flex justify-around md:justify-center items-center">
          <div className="w-[45px] h-[45px] flex justify-center items-center text-[1.5rem] cursor-pointer hover:text-primary-green">
            {!addCartStatus ? (
              <BsCartCheck
                onClick={(e) => handleAddToCart(e, _id, product_price)}
              />
            ) : (
              <BsCartX onClick={(e) => handleRemovedToCart(e, _id)} />
            )}
          </div>
          <div className="w-[45px] h-[45px] flex justify-center items-center text-[1.5rem] cursor-pointer hover:text-primary-green">
            <AiOutlineHeart />
          </div>
          <div className="w-[45px] h-[45px] flex justify-center items-center text-[1.5rem] cursor-pointer hover:text-primary-green">
            <AiOutlineEye onClick={vewProductDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCardSm;
