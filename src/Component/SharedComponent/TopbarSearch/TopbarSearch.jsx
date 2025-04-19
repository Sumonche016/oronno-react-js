import React, { useEffect, useState } from "react";
import { getSearchProduct } from "../../../Services/apiServices";
import { useNavigate } from "react-router-dom";
import NurseryFilter from "../../Pages/Nursery/MIniComponent/NurseryFilter";
import Loading from "../Loading";

const TopbarSearch = () => {
  const [search, setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const navigate = useNavigate();

  const handelSearch = async () => {
    const response = await getSearchProduct(search);
    setSearchResult(response.data);

    navigate(`/search/${search}`);
    // setSearch('');
  };
  console.log(searchResult);

  return (
    <div className="container mx-auto">
      {/* search for product */}
      <fieldset className="w-full border border-primary my-5 ">
        {/* <label for="Search" className="hidden">Search</label> */}
        <div className="relative ">
          <input
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && handelSearch();
            }}
            type="text"
            name="Search"
            id="Search"
            placeholder="Search for products.. "
            className="flex flex-1 w-full text-sm  focus:outline-none py-4 px-2 md:text-[17px]"
          />

          <span className="absolute inset-y-0 right-3 flex items-center pl-2">
            <button
              onClick={() => handelSearch()}
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

      {/* if product found filterd conponent call */}
      {/* {<NurseryFilter searchResult={searchResult} />} */}
    </div>
  );
};

export default TopbarSearch;
