import React from "react";

const ShowDetailText = ({ data }) => {
  const { title, text, no } = data || {};
  return (
    <div className="mt-7 md:mt-0">
      <h1 className="text-xl px-1.5 md:px-0 font-semibold mb-5 md:ml-14 md:mr-6 relative detail_title">
        {title} {no && `(${no})`}
      </h1>
      <p className="font-normal leading-7 px-1.5 md:px-0 md:ml-14 md:mr-6 text-justify">
        {text}
      </p>
    </div>
  );
};

export default ShowDetailText;
