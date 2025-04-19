import React, { useEffect, useState } from "react";
import SingleCart from "./SingleCart";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { selectAllCartItem } from "../../../Redux/filter/selectFilter";
import { useDispatch, useSelector } from "react-redux";
import { useGetManyProductByIdQuery } from "../../../Redux/filter/filterApi";
import CartPageLoading from "../../../loading/CartPageLoading";
import DeliveryAddress from "../Checkout/DeliveryAddress";

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const allCurtItem = useSelector(selectAllCartItem);
  const [promoCode, setPromoCode] = useState(0);
  const [promoCodeInputValue, setPromoCodeInputValue] = useState("");
  const allCurtIteId = allCurtItem?.map((obj) => obj.id);
  const { data, isError, isLoading, error } =
    useGetManyProductByIdQuery(allCurtIteId);

  // calculate Total Price function
  const calculateTotalPrice = (promoCode = 0) => {
    let allProductTotalPrice = 0;
    allCurtItem?.map((reduxP) => {
      const existProduct = data?.data?.find(
        (serverP) => serverP?._id == reduxP?.id
      );
      if (existProduct) {
        const singleProductTotalPrice =
          Number(existProduct?.product_price) * Number(reduxP?.value);
        allProductTotalPrice = allProductTotalPrice + singleProductTotalPrice;
      }
    });
    return allProductTotalPrice - promoCode;
  };

  // apply promo code
  const handleApplyPromoCode = () => {
    setPromoCode(Number(promoCodeInputValue));
  };

  const finalTotalPrice = calculateTotalPrice(promoCode) + 50;

  // decide what to render
  let content = "";
  if (isLoading) {
    content = [1, 2, 3, 4].map(() => <CartPageLoading />);
  }
  if (!isLoading && isError) {
    content = (
      <div className="py-10 text-red-800">No Product found in cart</div>
    );
  }
  if (!isLoading && !isError && data?.data.length === 0) {
    content = <div>No Product Found</div>;
  }
  if (!isLoading && isError && error?.status == "PARSING_ERROR") {
    content = <div>No Product Found</div>;
  }

  if (
    !isLoading &&
    data?.data.length >= 0 &&
    error?.status !== "PARSING_ERROR"
  ) {
    content = data?.data.map((product, key) => {
      const { _id } = product;
      const quantity = allCurtItem?.find((p) => p.id === _id)?.value;
      let totalPrice = product?.product_price * quantity;
      return (
        <SingleCart
          key={key}
          product={product}
          totalPrice={totalPrice}
          quantity={quantity}
        ></SingleCart>
      );
    });
  }

  const navigate = useNavigate();

  return (
    <div className=" bg-[#F5F5F6]   h-full flex justify-center items-center py-[3rem] ">
      <div className=" border-primary  rounded-md w-[95%]  mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/*left side cart  table */}
          <div className="col-span-1 md:col-span-2 md:py-5 md:px-5 p-3 bg-white border-primary h-fit">
            <div className="bg-white border-b-2 border-primary py-4">
              <h1 className="primary-heading-color font-semibold">
                Shopping Cart
              </h1>
            </div>
            <div className="flex  mt-4">
              <div className=" text-[14px] md:text-[1rem] flex justify-start md:justify-start flex-1 basis-[5%] md:basis-[20%]  primary-heading-color font-semibold">
                Product Details
              </div>
              <div className=" text-[14px] md:text-[1rem] flex justify-end md:justify-start flex-1 font-medium primary-heading-color ">
                Quantity
              </div>
              <div className=" text-[14px] md:text-[1rem] flex justify-end md:justify-start flex-1 font-medium primary-heading-color ">
                Price
              </div>
              <div className=" text-[14px] md:text-[1rem] flex justify-end md:justify-start flex-1 font-medium primary-heading-color ">
                Total
              </div>
            </div>
            {/* mapping all product from local storage */}
            {content}

            <button
              onClick={() => navigate("/হোম")}
              className=" mt-6 flex items-center  text-[#3A9943] font-medium cursor-pointer"
            >
              <MdOutlineKeyboardBackspace className="mr-2" />
              <h1>Continue Shopping</h1>
            </button>
          </div>

          {/* order address page */}
          <div className="col-span-1  md:col-span-1  md:mx-4 mt-4 md:mt-0">
            <DeliveryAddress />
          </div>
        </div>


      </div>
    </div>
  );
};

export default Cart;
