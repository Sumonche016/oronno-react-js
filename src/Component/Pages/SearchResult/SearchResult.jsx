import React, { useEffect } from "react";
import { useGetSearchProductQuery } from "../../../Redux/filter/filterApi";
import { useSelector } from "react-redux";
import { selectSearchKeyword } from "../../../Redux/filter/selectFilter";
import ProductCard from "../../SharedComponent/ProductPage/MiniComponent/ProductCard";
import SingleProductCart from "../../SharedComponent/ProductCart/SingleProductCart";
import SingleProductCartLoading from "../../../loading/SingleProductCartLoading";

const SearchResult = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const searchKeyword = useSelector(selectSearchKeyword);
  const { data, isLoading, isError, error } =
    useGetSearchProductQuery(searchKeyword);

  const searchData = data?.data || [];
  console.log(searchData);

  //desisted what to render
  let content = null;
  if (isLoading) {
    content = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key) => (
      <SingleProductCartLoading key={key} />
    ));
  }
  if (!isLoading && isError) {
    content = <h1>Something is Wrong </h1>;
  }
  if (!isLoading && searchData.length <= 0) {
    content = <h1>Product not found</h1>;
  }
  if (!isLoading && searchData.length > 0) {
    content = searchData?.map((item, key) => {
      return <SingleProductCart key={key} product={item} />;
    });
  }

  return (
    <div className="container mx-auto min-h-[calc(100vh_-_9rem)]">
      <div className="py-12 px-5 grid justify-between gap-x-3 gap-y-12 grid-cols-1 || sm:grid-cols-2 || md:grid-cols-2 || lg:grid-cols-4 || xl:grid-cols-5 ">
        {content}
      </div>
    </div>
  );
};

export default SearchResult;
