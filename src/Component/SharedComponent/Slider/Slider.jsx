import React from "react";
import Carousel from "./Carousel";
import { useGetAllBannerQuery } from "../../../Redux/banner/bannerApi";

const Slider = () => {
  const { data, isLoading } = useGetAllBannerQuery();

  let bannerContent = [];
  if (!isLoading && data?.result.length > 0) {
    bannerContent = data?.result.map((sData) => (
      <img
        key={sData._id}
        className="min-w-full h-full  "
        src={sData.url}
        alt="img"
      />
    ));
  }

  return (
    <div className="w-full">
      <div className="max-w-full h-auto">
        {<Carousel>{bannerContent}</Carousel>}
      </div>
    </div>
  );
};

export default Slider;
