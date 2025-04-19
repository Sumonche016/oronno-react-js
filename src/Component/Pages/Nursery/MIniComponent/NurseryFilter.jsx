import React, { useState } from "react";
import NavFilter from "./NavFilter";
import { useGetProductByCategoryQuery } from "../../../../Redux/product/productApi";
import SingleProductCart from "../../../SharedComponent/ProductCart/SingleProductCart";
import SingleProductCartLoading from "../../../../loading/SingleProductCartLoading";

const NurseryFilter = ({ category }) => {
  const [limit, setLimit] = useState(20);
  const {
    currentData: allProducts,
    isLoading,
    isError,
    isFetching,
  } = useGetProductByCategoryQuery({ limit: limit, category });
  console.log(allProducts);

  const handleSeeMore = () => {
    setLimit((prevLimit) => prevLimit + 20); // Increase the limit by 20
  };

  // reactHook
  let content = "";
  if (isLoading || isFetching) {
    let elementCount = [];
    for (let i = 0; i < limit; i++) {
      elementCount.push(i);
    }
    content = elementCount.map((key) => <SingleProductCartLoading key={key} />);
  } else if (!isLoading && isError) {
    content = <div>is Error</div>;
  } else if (!isLoading && !isError && allProducts?.data === 0) {
    content = <div>No Product Found</div>;
  } else {
    content = allProducts?.data?.map((product, key) => (
      <SingleProductCart key={key} product={product} />
    ));
  }

  return (
    <div className="container mx-auto mt-8 md:mt-16">
      {/* nav filter  */}
      <NavFilter />

      {/* total product in Gelary */}
      <div
        className={`transition-all duration-300 bg-primary-white mt-2 pb-10 mb-16`}
      >
        {/* Banner for product */}
        <section className="py-6">
          <div className="container flex flex-col justify-center mx-auto">
            <div className="mx-1.5 grid justify-between gap-x-3 gap-y-6 grid-cols-2 || sm:grid-cols-2 sm:gap-x-3 sm:gap-y-8 || md:grid-cols-2 md:gap-x-3 md:gap-y-10 || lg:grid-cols-4 lg:gap-x-3 lg:gap-y-12 || xl:grid-cols-5">
              {content}
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
          </div>
        </section>
      </div>
    </div>
  );
};
export default NurseryFilter;
