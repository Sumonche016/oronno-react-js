import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decrementToCart,
  removeToCart,
} from "../../../Redux/filter/filterSlice";
import useStoreProduct from "../../../hooks/useStoreProduct";
import useDecreaseCurtItem from "../../../hooks/useDecreaseCurtItem";
import useRemoveCart from "../../../hooks/useRemoveCart";

const SingleCart = ({ product, totalPrice, quantity }) => {
  const dispatch = useDispatch();

  const increment = (proId, price) => {
    console.log(proId, price);
    dispatch(addToCart({ _id: proId, price }));
    console.log(product);
    useStoreProduct(proId, price);
  };
  const decrement = (proId, price) => {
    dispatch(decrementToCart({ _id: proId, price }));
    useDecreaseCurtItem(proId, price);
  };

  const handelRemoveCart = (proId) => {
    dispatch(removeToCart({ _id: proId }));
    useRemoveCart(proId);
  };

  return (
    <div className="flex mt-6">
      <div className="flex flex-1 basis-[20%] items-center">
        <img
          src={product?.product_images}
          className="w-[70px] md:w-[90px] h-[70px]  md:h-[90px]"
          alt=""
        />
        <div className="ml-2 md:ml-4">
          <h1 className="text-[14px] md:text-[1rem] font-medium">
            {product?.product_title}
          </h1>
          <h1
            onClick={() => handelRemoveCart(product?._id)}
            className=" font-medium mt-4 text-[14px] md:text-[1rem] cursor-pointer"
          >
            Delete
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center ">
        <div
          onClick={() => decrement(product._id, product.product_price)}
          className="cursor-pointer"
        >
          <AiOutlineMinus className="text-[15px] mr-2 font-medium" />
        </div>
        <input
          value={quantity}
          onChange={(e) => setQuantityNumber(parseInt(e.target.value))}
          className="h-6 p-0 md:pl-2 w-[30px] md:w-[40px] text-[#777] font-medium  focus:outline-none text-center border-2 border-primary"
          type="number"
          name=""
          id=""
        />
        <div
          onClick={() => increment(product._id, product.product_price)}
          className="cursor-pointer"
        >
          <AiOutlinePlus className="text-[15px] ml-2 font-medium" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center md:justify-start">
        <h1 className="font-medium">{product.product_price} ৳</h1>
      </div>
      <div className="flex flex-1 items-center justify-end md:justify-start">
        <h1 className="font-medium"> {totalPrice} ৳</h1>
      </div>
    </div>
  );
};

export default SingleCart;
