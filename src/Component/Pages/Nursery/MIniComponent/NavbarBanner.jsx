import React from "react";
import SinglePageSlider from "../../../SharedComponent/SinglePageSlider";
import HeroSection from "../../Home/HeroSection";

const NavbarBanner = ({ tittle }) => {
  return (
    <>
      <div className="mx-auto container mt-0 md:mt-16">
        <div className="bg-primary-white">
          <div className="relative text-center">
            <div className="hover-product pt-3 md:pt-8">
              <h1 className="text-xl md:text-3xl text-primary-text font-medium pb-1 md:pb-3">
                {tittle}
              </h1>
              <div className="my-border-1 mx-auto w-[10rem] px-10 mt-[-2px]"></div>
            </div>
          </div>

          {/* slider */}

          <SinglePageSlider />
        </div>
      </div>
    </>
  );
};

export default NavbarBanner;
