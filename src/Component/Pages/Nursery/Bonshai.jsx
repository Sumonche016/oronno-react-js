import React, { useEffect } from "react";
import NavbarBanner from "./MIniComponent/NavbarBanner";
import NurseryFilter from "./MIniComponent/NurseryFilter";

const Bonshai = ({ category }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mb-10">
      <NavbarBanner tittle={"সর্বাধিক বিক্রিত বনসাই"} />
      <NurseryFilter category={category} />
    </div>
  );
};

export default Bonshai;
