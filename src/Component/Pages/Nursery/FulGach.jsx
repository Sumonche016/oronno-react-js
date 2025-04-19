import React, { useEffect } from "react";
import NavbarBanner from "./MIniComponent/NavbarBanner";
import NurseryFilter from "./MIniComponent/NurseryFilter";

const FulGach = ({ category }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mb-10">
      <NavbarBanner tittle={"সর্বাধিক বিক্রিত ফুল গাছ"} />
      <NurseryFilter category={category} />
    </div>
  );
};

export default FulGach;
