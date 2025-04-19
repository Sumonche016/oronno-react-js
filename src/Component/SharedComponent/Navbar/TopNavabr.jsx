import { FaPhoneAlt } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";
import logo from "../../../assets/Images/logo-green.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllCartItem } from "../../../Redux/filter/selectFilter";

const TopNavabr = () => {
  const allCurtItem = useSelector(selectAllCartItem);
  const totalPrice = useSelector((state) => state.filter.totalPrice);
  const navigate = useNavigate();

  const callSupport = () => {
    window.location.href = "tel:01711258558";
  };

  return (
    <div className="bg-white py-[20px] border-b border-primary fixed top-0 left w-full z-[9999]">
      <div className="md:container w-[96%] mx-auto ">
        <div className="flex justify-between">
          <div className="flex items-center" onClick={callSupport}>
            <div>
              <div className="bg-primary-red w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center">
                <FaPhoneAlt className="text-white text-[14px] md:text-[16px]" />
              </div>
            </div>
            <div className="ml-2 md:ml-4">
              <h1 className="contact hidden md:inline-block">
                Customer Support
              </h1>
              <a
                // href="tel:01711258558"
                className="text-[#777777] text-[13px] !block md:text-[15px]"
              >
                01711258558
              </a>
            </div>
          </div>

          <div>
            <img
              onClick={() => navigate("/")}
              className="w-[120px] md:w-[150px]  cursor-pointer"
              src={logo}
              alt="Logo image "
            />
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <div>
              <div className="bg-primary-red w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full flex justify-center items-center">
                <BiShoppingBag className="text-white md:text-[20px] text-[14px] " />
              </div>
            </div>
            <div className=" ml-2 md:ml-4">
              <h1 className="contact hidden md:inline-block">Shopping Cart</h1>
              <h1 className="text-[#777777] text-[13px] md:text-[14px]">
                <span class="cart-total">
                  {totalPrice} ৳ - {allCurtItem?.length}{" "}
                  <span class="cart-products-totals">iteme </span>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavabr;
