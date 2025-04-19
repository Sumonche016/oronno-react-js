import React, { useState } from "react";
import { useAdminPasswordResetMutation } from "../../../Redux/auth/authApi";

const OtpResent = ({ resetEmail }) => {
  const [passwordResetFN] = useAdminPasswordResetMutation();

  // handle login function
  const onSubmit = (email) => {
    passwordResetFN({ email });
  };

  // comedown one m
  const [cameDownValue, setComeDownValue] = useState(Number);
  const startComedown = () => {
    let value = 60;
    const interval = 1000; // Interval in milliseconds
    const decrement = 1; // Amount to decrement at each interval
    const countdown = setInterval(() => {
      value -= decrement;
      setComeDownValue(value);

      if (value <= 0) {
        clearInterval(countdown); // Stop the countdown when value reaches 0
      }
    }, interval);
  };

  return (
    <div>
      {cameDownValue == 0 ? (
        <div className="mt-5 flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
          <p>Didn't recieve code?</p>{" "}
          <button
            onClick={() => {
              onSubmit(resetEmail);
              startComedown();
            }}
            className="flex flex-row items-center text-blue-600"
          >
            Resend
          </button>
        </div>
      ) : (
        <div className="mt-5 flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
          <p>Resent code again left</p>{" "}
          <button className="flex flex-row items-center text-blue-600">
            {" "}
            {cameDownValue}
          </button>
        </div>
      )}
    </div>
  );
};

export default OtpResent;
