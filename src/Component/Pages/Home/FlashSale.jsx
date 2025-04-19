import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Countdown from "./MiniComponent/Countdown";
import hoverImage from "../../../assets/Images/product1.jpg";
import SinglePageSlider from "../../SharedComponent/SinglePageSlider";

const FlashSale = () => {

  return (
    <div className="md:container mx-auto w-[95%] overflow-hidden md:py-[5rem] !pb-0">
      <div className="mt-4 md:mt-9 ">
        <div className="">
          <h1 className=" ml-1.5 text-lg md:text-2xl text-primary-text font-medium pb-1 md:pb-3 ">
            FlashSale
          </h1>
          <div className="w-[14rem] px-10 mt-[-2px]"></div>
        </div>
      </div>
      <div className=" border-b-2 border-primary px-1.5 md:px-2.5 py-2 md:py-4 flex flex-col justify-between  mx-auto lg:flex-row divide-primary">
        <div className="flex items-center justify-start">
          <span className="rounded-sm p-1.5 md:p-2 text-sm md:text-base bg-primary-deep-green text-primary-white font-medium">
            On Sale Now
          </span>
          {<Countdown hours={1} minutes={30} seconds={0} />}
        </div>
        <div className="flex flex-col justify-center">
          {/* <Button className='bg-transparent text-primary-green border-2'>Shop Now</Button> */}
        </div>
      </div>

      <div className=" w-full  ">
        <SinglePageSlider />
      </div>
    </div>
  );
};

export default FlashSale;
