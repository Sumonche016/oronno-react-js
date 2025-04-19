import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const NavFilter = () => {
  const [selectPrice, setSelectPrice] = useState("All");
  const [selectShort, setSelectShort] = useState("popularity");

  const priceRangeOptions = [
    { value: "All", label: "All" },
    { value: "0-1250", label: "0.00৳ - 1,250.00৳" },
    { value: "1250-2500", label: "1,250.00৳ - 2,500.00৳" },
    { value: "2500-3750", label: "2,500.00৳ - 3,750.00৳" },
    { value: "3750-5000", label: "3,750.00৳ - 5,000.00৳" },
  ];
  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "rating", label: "Average rating" },
    { value: "newness", label: "Newness" },
    { value: "low-to-high", label: "Price: low to high" },
    { value: "high-to-low", label: "Price: high to low" },
  ];
  const handlePriceChange = (event) => {
    setSelectPrice(event.target.value);
  };
  const handleShortChange = (event) => {
    setSelectShort(event.target.value);
  };

  const location = useLocation();

  const pathname = decodeURI(location.pathname).split("/");
  return (
    <div>
      {/* navbar for filter */}
      <div className="flex bg-primary-white justify-between items-center text-[1rem] flex-wrap py-4 px-2">
        {/* left nested path */}
        <div className="flex md:py-0 py-5 ">
          <nav aria-label="breadcrumb" className="w-full">
            <ol className="flex h-8 font-medium ">
              <li className="flex items-center">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Back to homepage"
                  className="flex items-center  text-heading-gray hover:text-heading-black pe-1 "
                >
                  Home
                </a>
              </li>
              <li className="flex items-center  text-heading-gray hover:text-heading-blackspace-x-1">
                <span className=" text-heading-gray">/</span>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center text-heading-gray hover:text-heading-black px-1"
                >
                  Shop
                </a>
              </li>

              <Link className="flex items-center  text-heading-gray hover:text-heading-blackspace-x-1">
                <span className=" text-heading-gray hover:text-heading-black">
                  /
                </span>
                <p
                  rel="noopener noreferrer"
                  className="flex items-center text-heading-black font-medium px-1"
                >
                  {pathname[1]}
                </p>
              </Link>
              <Link className="flex items-center  text-heading-gray hover:text-heading-blackspace-x-1">
                <span className=" text-heading-gray hover:text-heading-black">
                  /
                </span>
                <p
                  rel="noopener noreferrer"
                  className="flex items-center text-heading-black font-medium px-1"
                >
                  {pathname[2]}
                </p>
              </Link>
            </ol>
          </nav>
        </div>
        {/* right side filter and show*/}
        <div className="flex flex-wrap  md:space-y-0 space-y-5">
          {/* short by price */}
          <div className="flex items-center   space-x-4">
            <label
              htmlFor="price-sort"
              className="font-medium text-lg text-primary-text"
            >
              Sort by price:
            </label>
            <select
              id="price-sort"
              value={selectPrice}
              onChange={handlePriceChange}
              className="border-2 border-primary rounded-sm p-2 outline-none"
            >
              {priceRangeOptions?.map((option) => (
                <option
                  key={option.value}
                  className="hover:bg-primary-green "
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* short by */}
          <div className="flex items-center space-x-4 lg:px-5">
            <label
              htmlFor="price-sort"
              className="font-medium text-lg text-primary-text"
            >
              Sort by:
            </label>
            <select
              id="price-sort"
              value={selectShort}
              onChange={handleShortChange}
              className="border-2 border-primary rounded-sm p-2 outline-none"
            >
              {sortOptions?.map((option) => (
                <option
                  className="hover:bg-primary-green "
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* clear button under filter */}
      <div className="flex items-start justify-start space-x-2 transition-all duration-300 bg-primary-white">
        {selectShort != "popularity" && (
          <div className="flex items-start justify-between   rounded-md border-2 border-primary">
            <div className=" px-2 space-y-1">
              <span className="text-sm font-semibold uppercase">
                {selectShort}
              </span>
            </div>
            <button
              type="button"
              title="Close snackbar"
              onClick={() => setSelectShort("popularity")}
              className="hover:text-primary-red"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="flex-shrink-0 w-4 h-4 my-1"
              >
                <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
              </svg>
            </button>
          </div>
        )}

        {selectPrice != "All" ? (
          <div className="flex items-start justify-between   rounded-md border-2 border-primary">
            <div className=" px-2 space-y-1">
              <span className="text-sm font-semibold">{selectPrice}</span>
            </div>
            <button
              type="button"
              title="Close snackbar"
              onClick={() => setSelectPrice("All")}
              className="hover:text-primary-red"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="flex-shrink-0 w-4 h-4 my-1"
              >
                <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
              </svg>
            </button>
          </div>
        ) : (
          " "
        )}
        {(selectPrice != "All" || selectShort != "popularity") && (
          <div className="flex items-start justify-between   rounded-md border-2 border-primary">
            <div className=" px-2 space-y-1">
              <span className="text-sm font-semibold">Clear</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectShort("popularity");
                setSelectPrice("All");
              }}
              title="Close snackbar"
              className="hover:text-primary-red"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                className="flex-shrink-0 w-4 h-4 my-1"
              >
                <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavFilter;
