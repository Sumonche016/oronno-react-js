import React, { useEffect, useState } from "react";
import HeroProductPage from "./HeroProductPage";
import DetailsSection from "./DetailsSection";
import SocialShareBox from "../SocialShareBox/SocialShareBox";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../../Redux/product/productApi";
import ProductPageLoading from "../../../loading/ProductPageLoading";
import ReviewShowPage from "./ReviewShowPage";

const ProductPage = () => {
  const { id } = useParams();
  // scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  //get this page location
  const carnetPageLocation = window.location.href;
  const [isOpen, setIsOpen] = useState(false);

  // const [singleProduct, setSingleProduct] = useState([]);
  const { data, isLoading, isError } = useGetSingleProductQuery(id, { refetchOnMountOrArgChange: true });
  const singleProduct = data?.data;
  // console.log(data?.reviews)
  // desisted what to render
  let content = null;
  if (isLoading) {
    content = <ProductPageLoading />;
  }
  if (!isLoading && isError) {
    content = <h1>Error</h1>;
  }
  if (!isLoading && singleProduct) {
    content = (
      <div className="mb-10 relative">
        <HeroProductPage
          productTitle={singleProduct.product_title}
          productImage={singleProduct.product_images}
          price={singleProduct.product_price}
          productInfo={singleProduct.product_info}
          setIsOpen={setIsOpen}
          _id={singleProduct._id}
        />
        <DetailsSection product={singleProduct} />

        <ReviewShowPage singleProductID={singleProduct?._id} />


        <SocialShareBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          carnetPageLocation={carnetPageLocation}
        />
      </div>
    );
  }

  // console.log("data", singleProduct);
  return content;
};

export default ProductPage;
