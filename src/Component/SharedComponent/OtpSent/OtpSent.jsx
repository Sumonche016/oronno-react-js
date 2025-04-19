import React, { useState, useRef, useEffect } from "react";
import { useAdminOtpVerifyMutation } from "../../../Redux/auth/authApi";
import OtpResent from "../OtpResent/OtpResent";
import UpdatePassword from "../UpdatePassword";

function OtpSent({ resetEmail }) {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpValue, setOtpValue] = useState("");
  const inputRefs = useRef([]);

  console.log(otpValues.join(""));

  const handleChange = (index, event) => {
    const { value } = event.target;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otpValues[index] && index > 0) {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);
      inputRefs.current[index - 1].focus();
    }
  };

  // verify otp
  const [otpVerifyFN, { data: otpVerifyData, isLoading, isError, error }] =
    useAdminOtpVerifyMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const otp = Number(otpValues.join(""));
    console.log("submit", resetEmail, otp);
    otpVerifyFN({ email: resetEmail, otp });
  };

  //handle error and success
  const [otpSuccess, setOtpSuccess] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (otpVerifyData?.success && !isLoading) {
      setOtpError("");
      setOtpSuccess(otpVerifyData?.message);
    }
    if (isError && !isLoading) {
      setOtpSuccess("");
      setOtpError(error?.data?.message);
    }
  }, [isLoading, isError, otpVerifyData]);

  return (
    <>
      {!otpSuccess ? (
        <div>
          <div className="mb-8 flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Password Reset</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>

          <form onSubmit={onSubmit}>
            {/* input */}
            <div className="flex gap-2 justify-center">
              {otpValues.map((value, index) => (
                <input
                  className="w-12 h-12 lg:w-10 lg:h-12 xl:w-12 xl:h-10 flex flex-col items-center justify-center text-center px-3 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  required
                />
              ))}
            </div>

            {/* verify button */}
            <div>
              <button className="mt-5 flex flex-row items-center justify-center text-center w-full border rounded-md outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm">
                Continue
              </button>
            </div>
          </form>

          {/* show error */}
          {otpError && (
            <div className="mt-5 px-3 py-2 bg-[#ffd6d6] text-[#ba2121] rounded-md font-medium">
              {otpError}
            </div>
          )}

          {/* resent code */}
          <OtpResent />
        </div>
      ) : (
        <UpdatePassword resetEmail={resetEmail} />
      )}
    </>
  );
}

export default OtpSent;
