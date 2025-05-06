import React, { useEffect } from "react";
import AmaderPonnosomuho from "./AmaderPonnosomuho";
import FlashSell from "./FlashSale";
import "./HomeIndex.css";
import HeroSection from "./HeroSection";
import ContactUs from "./ContactUs";
import BeliveText from "./BeliveText";
import FaqIndex from "./FAQ/FaqIndex";
import TrustedCompany from "./TrustedCompnay";
import RentalService from "./RentalService";
import Pakage from "./Pakage";
import LandScapeing from "./LandScapeing";

const HomeIndex = () => {
  return (
    <div>
      <HeroSection />
      {/* <FlashSell /> */}
      {/* <BeliveText /> */}
      <LandScapeing />

      <RentalService />
      <TrustedCompany />

      <Pakage />

      <AmaderPonnosomuho />
      <FaqIndex />
      <ContactUs />
    </div>
  );
};

export default HomeIndex;
