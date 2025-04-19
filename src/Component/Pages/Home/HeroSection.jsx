import React from "react";
import Slider from "../../SharedComponent/Slider/Slider";
import SideNav from "./MiniComponent/SideNav";

const HeroSection = () => {
  return (
    <div className="container md:mt-4 mt-2 mx-auto">
      <div className="flex">
        <SideNav />
        <Slider />
      </div>
    </div>
  );
};

export default HeroSection;
