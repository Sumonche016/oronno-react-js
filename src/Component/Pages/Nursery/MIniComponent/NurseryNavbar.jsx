import React from "react";
import { Link, useLocation } from "react-router-dom";

const NurseryNavbar = () => {
  const location = useLocation();

  const pathname = decodeURI(location.pathname)
    .replace("/product-category/", "")
    .split("/");
  let linkPath = "";
  return (
    <div className="container mx-auto">
      {/* top navbar part */}
      <div className="flex justify-between items-center text-[.8rem] flex-wrap my-5">
        {/* left nested path */}
        <div className="flex">
          <nav aria-label="breadcrumb" className="w-full">
            <ol className="flex h-8 ">
              <li className="flex items-center">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  title="Back to homepage"
                  className="flex items-center  text-heading-gray hover:text-primary-black  pe-1 "
                >
                  Home
                </a>
              </li>
              <li className="flex items-center  text-heading-gray hover:text-primary-black  space-x-1">
                <span className=" text-heading-gray">/</span>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center text-heading-gray hover:text-primary-black  px-1"
                >
                  Shop
                </a>
              </li>
              {pathname &&
                pathname?.map((path, index) => {
                  if (index == 0) {
                    linkPath += path;
                  } else {
                    linkPath += "/" + path;
                  }
                  return (
                    <Link
                      key={index}
                      to={`/product-category/${linkPath}`}
                      className="flex items-center  text-heading-gray hover:text-primary-black space-x-1"
                    >
                      <span className=" text-heading-gray hover:text-primary-black">
                        /
                      </span>
                      <p
                        rel="noopener noreferrer"
                        className="flex items-center text-primary-black  font-medium px-1"
                      >
                        {path}
                      </p>
                    </Link>
                  );
                })}
            </ol>
          </nav>
        </div>
        {/* search for product */}
        <fieldset className=" w-[80%] border border-gray-200 my-5 p-3 ">
          <label htmlFor="Search" className="hidden">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              name="Search"
              id="Search"
              placeholder="Search for products "
              className="flex flex-1 w-full sm:text-sm  focus:outline-none "
            />

            <span className="absolute inset-y-0 right-3 flex items-center pl-2">
              <button
                type="button"
                title="search"
                className="p-1 focus:outline-none"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-6 h-6"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default NurseryNavbar;
