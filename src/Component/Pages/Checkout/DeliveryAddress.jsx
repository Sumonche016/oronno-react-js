import { useState } from "react";
import { useForm } from "react-hook-form";

import OrderSummary from "./OrderSummary";
import OrderAmount from "./OrderAmount";
import { useSelector } from "react-redux";
import { selectAllCartItem } from "../../../Redux/filter/selectFilter";
import { useNewOdderMutation } from "../../../Redux/odder/odderApi";
import BtnLoading from "../../../ui/BtnLoading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../../../firebase/firebase.init";
import PaymentMethodSelection from "./PaymentMethodSelection";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import FormControlLabel from "@mui/material/FormControlLabel";
const DeliveryAddress = () => {
  const odderData = useSelector(selectAllCartItem);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(100);
  const auth = getAuth(app);
  const [user] = useAuthState(auth);

  const [addNewOdderFN, { data: odderResult, isError, isLoading }] =
    useNewOdderMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const deliveryLocation = data.deliveryLocation;

    if (deliveryLocation === "insideDhaka") {
      setDeliveryCharge(60);
    } else if (deliveryLocation === "outsideDhaka") {
      setDeliveryCharge(120);
    }

    const odderBill = {
      address: data,
      product: odderData.map((p) => {
        const newProductData = { _id: p.id, quantity: p.value };
        return newProductData;
      }),
    };

    await addNewOdderFN(odderBill);
  };

  if (odderResult) {
    toast.success(odderResult.message);
    navigate("/");
  }

  const handleDeliveryChange = (event) => {
    setDeliveryCharge(Number(event.target.value));
  };

  return (
    <div className="checkout">
      {/* shopping address */}
      <div className="bg-white border py-6 border-primary-green px-2">
        <h4 className=" text-red-500 flex font-medium items-center text-center  pb-2 border-b border-primary">
          অর্ডার কনফার্ম করতে আপনার নাম, মোবাইল নাম্বর, ঠিকানা লিখে " অর্ডার
          করুন " বাটনে ক্লিক করুন।
        </h4>
        {/* use form for address */}
        <form id="checkoutform" onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="">
              {/* user name */}
              <div className="form-control mb-2">
                <label className="label">
                  <span className="block mb-1.5 text-sm font-medium">
                    নাম <span className="text-red-700 text-lg">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন..."
                  className="bg-[#F5F5F5] text-sm md:rounded-md focus:outline-none block w-full p-2.5"
                  {...register("name", { required: true })}
                />
                {errors?.name?.type === "required" && (
                  <span className="label-text-alt text-red-500 text-lg">
                    নাম অবশ্যই লিখতে হবে
                  </span>
                )}
              </div>
              {/* your phone number */}
              <div className="form-control">
                <label className="label">
                  <span className="block mb-1.5 text-sm font-medium">
                    মোবাইল
                    <span className="text-red-700 text-lg">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="আপনার মোবাইল নাম্বার লিখুন..."
                  className="bg-[#F5F5F5] text-sm md:rounded-md focus:outline-none block w-full p-2.5"
                  {...register("phone", {
                    required: "ফোন নম্বর অবশ্যই দিতে হবে",
                    pattern: {
                      value: /^(00|88|01|\+88)[0-9]{9}$/,
                      message: "ফোন নম্বর সঠিক নয়",
                    },
                  })}
                />
                {errors?.phone && (
                  <span className="label-text-alt text-red-500 text-lg">
                    {errors?.phone.message}
                  </span>
                )}
              </div>
            </div>
            {/* contact address */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="block mb-1.5 text-sm font-medium">ঠিকানা</span>
              </label>
              <textarea
                rows="5"
                cols="50"
                placeholder="আপনার ঠিকানা লিখুন..."
                className="bg-[#F5F5F5] text-sm md:rounded-md focus:outline-none block w-full p-2.5"
                {...register("address", {
                  maxLength: {
                    value: 200,
                    message: "ঠিকানা অনুমোদিত সীমা ছাড়িয়ে গেছে",
                  },
                })}
              />
              {errors?.address?.message && (
                <span className="label-text-alt text-red-500 text-lg">
                  {errors?.address.message}
                </span>
              )}
            </div>

            {/* Delivery location */}
            <div className="form-control text-center mt-4">
              <span className="text-base md:text-[1rem] px-10 py-1  text-primary-black   text-center">
                <div className="inline-flex items-center my-4">
                  ডেলিভারি চার্জ
                </div>
              </span>
              <div className="flex  justify-between px-2">
                <RadioGroup
                  value={deliveryCharge.toString()}
                  onChange={handleDeliveryChange}
                >
                  <div className="flex items-center gap-2">
                    <FormControlLabel
                      value="100"
                      control={<Radio />}
                      label=" 100 Tk"
                    />
                  </div>
                </RadioGroup>
              </div>
              {errors.deliveryLocation && (
                <span className="label-text-alt text-red-500 text-lg">
                  অবস্থান নির্বাচন করতে হবে
                </span>
              )}
            </div>
          </div>
        </form>
      </div>

      <PaymentMethodSelection deliveryCharge={deliveryCharge} />

      {/* order biboroni */}
      <div className="md:p-4 p-2 border border-primary bg-white">
        <OrderSummary setTotalPrice={setTotalPrice} />
        <OrderAmount totalPrice={totalPrice} deliveryCharge={deliveryCharge} />
        <div className="mt-5 flex gap-2 items-center">
          <button
            form="checkoutform"
            disabled={isLoading}
            type="submit"
            className="text-base md:text-[1rem] font-semibold px-4 py-1 bg-green-500 text-primary-white border border-primary-deep-green duration-150 ease-out w-full"
          >
            {!isLoading ? (
              <div className="text-center inline-flex items-center">
                অর্ডার করুন
              </div>
            ) : (
              <BtnLoading />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
