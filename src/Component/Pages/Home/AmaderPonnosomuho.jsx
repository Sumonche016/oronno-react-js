import React, { useEffect, useState } from "react";
import { useGetProductByCategoryQuery } from "../../../Redux/product/productApi";
import SingleProductCart from "../../SharedComponent/ProductCart/SingleProductCart";
import SingleProductCartLoading from "../../../loading/SingleProductCartLoading";
import Loading from "../../SharedComponent/Loading";
const AmaderPonnosomuho = () => {
  const [searchCategory, setSearchCategory] = useState("");
  const [limit, setLimit] = useState(20);
  const {
    currentData: allProducts,
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetProductByCategoryQuery({ limit: limit, category: searchCategory });
  // console.log(isFetching);
  const handleSeeMore = () => {
    setLimit((prevLimit) => prevLimit + 20);
    refetch();
  };

  // reactHook
  let content = "";
  if (isLoading || isFetching) {
    let elementCount = [];
    for (let i = 0; i < limit; i++) {
      elementCount.push(i);
    }
    content = elementCount?.map((i, key) => (
      <SingleProductCartLoading key={key} />
    ));
  } else if (!isLoading && !isFetching && isError) {
    content = <div>is Error</div>;
  } else if (
    !isLoading &&
    !isFetching &&
    !isError &&
    allProducts?.length === 0
  ) {
    content = <div>No Product Found</div>;
  } else {
    content = allProducts?.data?.map((product, key) => (
      <SingleProductCart key={key} product={product} />
    ));
  }

  const active =
    "rounded-lg text-[13px] md:text-[.95rem] px-[18px] md:px-[27px] py-[8px] font-medium bg-[#059669] text-white cursor-pointer"
  const deActive =
    "rounded-lg text-[13px] md:text-[.95rem] px-[18px] md:px-[27px] py-[8px] font-medium bg-white cursor-pointer";
  const [activeLink, setActiveLink] = useState("সকল পণ্য");

  function handleLinkClick(name) {
    setActiveLink(name);
    if (name == "সকল পণ্য") {
      setSearchCategory("");
      return;
    }
    setSearchCategory(name);
  }
  return (
    <div id="shop" className="mx-auto container pt-5 md:pt-[3rem]">
      <div className="md:flex justify-between items-center mb-6">
        <h1 className=" text-center mb-4  text-3xl  font-semibold  text-[#212b36]">
          আমাদের পণ্যসমূহ
        </h1>
        <div className="flex items-center gap-2 justify-center text-sm md:text-base sm:mx-2.5 lg:-mx-4 pt-4 overflow-x-auto overflow-y-hidden flex-nowrap ">
        <div
          rel="noopener noreferrer"
          href="#"
          className={` ${activeLink === "সকল পণ্য" ? active : deActive}`}
          onClick={() => handleLinkClick("সকল পণ্য")}
        >
          
          <span>সকল পণ্য</span>
        </div>
        <div
          rel="noopener noreferrer"
          href="#"
          className={` ${activeLink === "ফল গাছ" ? active : deActive}`}
          onClick={() => handleLinkClick("ফল গাছ")}
        >
        
          <span>ফল গাছ</span>
        </div>
        <div
          rel="noopener noreferrer"
          href="#"
          className={` ${activeLink === "ফুল গাছ" ? active : deActive}`}
          onClick={() => handleLinkClick("ফুল গাছ")}
        >
         
          <span>ফুল গাছ</span>
        </div>
        <div
          rel="noopener noreferrer"
          href="#"
          className={` ${activeLink === "শোভাময় গাছ" ? active : deActive}`}
          onClick={() => handleLinkClick("শোভাময় গাছ")}
        >
        
          <span>শোভাময়-গাছ</span>
        </div>
      </div>
      </div>
      {/* navigation for sokol ponno */}
     


      {/* Banner for product */}
      <section className="py-6  mb-8 md:mb-16" id="ponno">
        <div className="container flex flex-col justify-center mx-auto">
          <div className="mx-1.5 grid justify-between gap-x-3 gap-y-6 grid-cols-2 || sm:grid-cols-2 sm:gap-x-3 sm:gap-y-8 || md:grid-cols-2 md:gap-x-5 md:gap-y-10 || lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12 || xl:grid-cols-5 ">
            {/* all product render hear  */}
            {content}
          </div>
        </div>
        {allProducts?.totalProductLength > limit && (
          <h2 className="text-center mx-auto mt-10">
            <button
              className="text-sm sm:text-base md:text-lg font-medium md:font-semibold px-2 md:px-4 py-1 md:py-2 rounded hover:bg-primary-deep-green hover:text-primary-white border-2 border-primary-deep-green duration-150 ease-out"
              onClick={handleSeeMore}
            >
              See more
            </button>
          </h2>
        )}
      </section>
    </div>
  );
};

export default AmaderPonnosomuho;
