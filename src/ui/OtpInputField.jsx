import React from "react";

const OtpInputField = (props) => {
  console.log(props);
  return (
    <div className="m-2 border h-10 w-10 text-center form-control rounded">
      <input {...props} />
    </div>
  );
};

export default OtpInputField;
