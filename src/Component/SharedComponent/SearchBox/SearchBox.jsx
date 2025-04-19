import React, { useState } from "react";
import UseFindWindowSize from "../../../hooks/UseFindWindowSize";
import { FaEnvelope, FaFacebook, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchKeyword } from "../../../Redux/filter/selectFilter";
import { addSearchKeyword } from "../../../Redux/filter/filterSlice";
import { useMatch, useNavigate } from "react-router-dom";

const SearchBox = ({ setsearchOpen, fromMobile, searchValue, handleSearch, setSearchValue }) => {
  const windowWidth = UseFindWindowSize();
  const dispatch = useDispatch();
  const searchKeyword = useSelector(selectSearchKeyword);



  //handle search field

  const navigate = useNavigate();




  //open dial pad
  const openDialPad = () => {
    const phoneNumber = "01797021366";
    window.open(`tel:${phoneNumber}`, "_self");
  };

  // close search box

  const hanldeSearchBox = (e) => {
    e.preventDefault();

    // setsearchOpen((prevState) => !prevState);
  };

  return (
    <div className=" bg-nav-color">
      <div className="  flex justify-between items-center">
        {/* contact info */}
        {/* <div
          className={`min-w-[13rem] ${windowWidth > 975 ? "block" : "hidden"}`}
        >
          <button className="bg-blue-500 p-1 sm:p-2 font-semibold text-white inline-flex items-center rounded gap-2">
            <FaPhoneAlt className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
            <p className="text-base pr-8 tracking-wide">01712-3456789</p>
          </button>
        </div> */}
        {/* search from  */}
        <form onSubmit={handleSearch} className={`flex items-center w-full `}>
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <button className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              id="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-[#F5F5F5] text-gray-900  text-sm md:rounded-md focus:outline-none block md:w-full pl-10 p-2.5"
              placeholder="Search Product Here..."
            />
            {/* 
            {!fromMobile && (
              <button
                onClick={hanldeSearchBox}
                className="absolute inset-y-0 right-0 flex items-center px-3 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            )} */}
          </div>
        </form>
        {/* social media and contact info */}
        {/* <div className="flex flex-nowrap justify-center gap-2">
          <button className="bg-blue-500 p-1 sm:p-2 font-semibold text-white inline-flex items-center rounded">
            <FaFacebook className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
          </button>
          <button className="bg-green-500 p-1 sm:p-2 font-semibold text-white inline-flex items-center rounded">
            <FaWhatsapp className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
          </button>
          <a
            href="mailto:test@example.com?subject=Testing out mailto!&body=This is only a test!"
            className="bg-[#EA4335] p-1 sm:p-2 font-semibold text-white inline-flex items-center rounded"
          >
            <FaEnvelope className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
          </a>
          <button
            onClick={openDialPad}
            className={`bg-blue-500 p-1 sm:p-2 font-semibold text-white items-center rounded ${windowWidth > 975 ? "hidden" : "inline-flex"
              }`}
          >
            <FaPhoneAlt className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBox;
