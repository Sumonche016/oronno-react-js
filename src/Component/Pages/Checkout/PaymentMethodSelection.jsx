import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import { useState } from "react";

const PaymentMethodSelection = ({ deliveryCharge }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <div className="bg-white border py-6 border-primary px-3 my-2 hidden">
      <h3 className="font-medium text-lg mb-2">পেমেন্ট মেথড সিলেক্ট করুন:</h3>
      <div className="space-y-2">
        <RadioGroup
          value={selectedPaymentMethod.toString()}
          onChange={handlePaymentMethodChange}
        >
          <div className="flex items-center gap-2">
            {deliveryCharge === 100 ? (
              <FormControlLabel
                value="cashon develivary"
                control={<Radio />}
                label="ক্যাশ অন ডেলিভারি"
              />
            ) : (
              <FormControlLabel
                value="courier condition"
                control={<Radio />}
                label="courier condition"
              />
            )}
            {/* <FormControlLabel value="cashon develivary" control={<Radio />} label="ক্যাশ অন ডেলিভারি" /> */}
          </div>
          <div className="">
            <FormControlLabel
              value="Mobile Banking"
              control={<Radio />}
              label="Mobile Banking bKash/Nogod/Rocket"
            />
            {selectedPaymentMethod === "Mobile Banking" && (
              <h1 className="text-sm ml-6 font-medium">
                {" "}
                01711258558{" "}
                <span className="text-red-500">(bKash)- send money only</span>
              </h1>
            )}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
