import React, { useEffect, useState } from "react";
import "./FooterIndex.css";
import { FaHome, FaWhatsapp } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { FaShoppingBasket } from "react-icons/fa";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCartItem } from "../../../Redux/filter/selectFilter";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import { MdAddCall } from "react-icons/md";
import { addToCart, removeToCart } from "../../../Redux/filter/filterSlice";
import useStoreProduct from "../../../hooks/useStoreProduct";
import { useGetSingleProductQuery } from "../../../Redux/product/productApi";
import useRemoveCart from "../../../hooks/useRemoveCart";
import { navSwitch } from "../../../Redux/nav/navSlice";
import whatsApp from "../../../assets/Images/whatsapp.png";
const FooterNavIndex = () => {
  const location = useLocation();
  const allCurtItem = useSelector(selectAllCartItem);
  const totalPrice = useSelector((state) => state.filter.totalPrice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const callSupport = () => {
    window.location.href = "tel:01711258558";
  };

  const callSupportWhatsApp = () => {
    window.open("https://wa.me/+8801711258558", "_blank");
  };

  const pathname = location?.pathname;
  const singleProduct = pathname?.split("/")[1];

  // handle add to cart

  const { data } = useGetSingleProductQuery(pathname?.split("/")[2]);

  const price = data?.data?.product_price;
  const _id = pathname?.split("/")[2];

  const [addCartStatus, setAddCartStatus] = useState(false);

  // check product already add to cart or not
  useEffect(() => {
    if (allCurtItem) {
      const findCartExist = allCurtItem?.find((item) => item.id == _id);
      if (findCartExist) {
        setAddCartStatus(true);
      } else {
        setAddCartStatus(false);
      }
      return;
    }
  }, [allCurtItem]);

  const handleAddToCart = () => {
    dispatch(addToCart({ _id, price }));
    useStoreProduct(_id, price);
  };

  // handle removed to cart
  const handleRemovedToCart = () => {
    dispatch(removeToCart({ _id }));
    useRemoveCart(id);
    setAddCartStatus(false);
  };

  const buyNow = () => {
    if (!addCartStatus) {
      dispatch(addToCart({ _id, price }));
      useStoreProduct(_id, price);
    }
    navigate("/cart");
  };


  const handleNavigateHome = () => {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }


  return (
    <div className="bg-white md:hidden  py-[10px] border-b border-primary fixed bottom-0 left w-full z-[999] shadow-deep footerNav">


      {
        singleProduct === "product" && <div className="phone-div">
          <a href="tel:01832883232">
            <span className="flex gap-2 items-center">
              <MdAddCall className="text-red-600" />
              <p>01711258558</p>
            </span>
          </a>
        </div>
      }


      <div className="w-[95%] mx-auto">
        <ul className="flex justify-between items-center">
          <li
            className="flex flex-col justify-center items-center cursor-pointer"
            onClick={handleNavigateHome}
          >
            <FaHome />
            <h1 className="mt-2">Home</h1>
          </li>
          {singleProduct === "product" ? (
            <>
              <li className="flex flex-col justify-center items-center">
                {/* <BiCategory /> */}
                <h1
                  onClick={handleAddToCart}
                  className="mt-2 red-box-2 bg-[#70c332]"
                >
                  Add To Cart
                </h1>
              </li>
              <li className="flex flex-col justify-center items-center cursor-pointer">
                <h1 onClick={buyNow} className="mt-2 red-box-2">
                  Buy Now
                </h1>
              </li>

              <li
                onClick={callSupportWhatsApp}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <img src={whatsApp} className="w-[26px]" alt="" />
                <h1 className="mt-2">WhatsApp</h1>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => dispatch(navSwitch())}
                className="flex flex-col justify-center items-center"
              >
                <BiCategory />
                <h1 className="mt-2">category</h1>
              </li>
              <li
                onClick={() => navigate("/cart")}
                className="flex flex-col justify-center items-center cursor-pointer"
              >
                <Badge
                  style={{ backgroundColor: "#5bc410" }}
                  size="small"
                  count={allCurtItem?.length}
                >
                  <FaShoppingBasket />
                </Badge>
                <h1 className="mt-2">carts</h1>
              </li>
              <li
                className="flex flex-col justify-center items-center cursor-pointer"
                onClick={callSupport}
              >
                <FaPhoneSquareAlt />
                <h1 className="mt-2">call now</h1>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FooterNavIndex;
