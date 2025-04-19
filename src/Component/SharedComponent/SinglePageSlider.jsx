import React, { useRef } from "react";
// @ts-ignore
import sImg from "../../assets/Images/hoverImage1.jpg";
// @ts-ignore
import img1 from "../../assets/Images/product1.jpg";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import HoverCardSm from "./HoverCardSm";
import { useGetHotProductQuery } from "../../Redux/product/productApi";
import SingleProductCartLoading from "../../loading/SingleProductCartLoading";
import { useNavigate } from "react-router-dom";

const SinglePageSlider = () => {
  const {
    currentData: allProducts,
    data,
    isLoading,
    isError,
    isFetching,
  } = useGetHotProductQuery();
  // const { allProducts } = useGetHotProductQuery();
  console.log("hot product", data);

  // handle View product detail's
  const navigate = useNavigate();
  const vewProductDetails = (_id) => {
    navigate(`/product/${_id}`);
  };

  // reactHook
  let content = "";
  if (isLoading || isFetching) {
    content = [1, 2, 3, 4, 5, 6, 7].map((key) => (
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
      <SwiperSlide key={key} onClick={() => vewProductDetails(product._id)}>
        {({ isActive }) => (
          <div
            className={` swiper-item ${isActive ? "active " : "not active"}`}
          >
            <HoverCardSm product={product} hidden></HoverCardSm>
          </div>
        )}
      </SwiperSlide>
    ));
  }

  return (
    <div className="py-[3rem]">

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}

        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          639: {
            slidesPerView: 2,
          },
          865: {
            slidesPerView: 4
          },
          1000: {
            slidesPerView: 5
          },
          1500: {
            slidesPerView: 5
          },
          1700: {
            slidesPerView: 7
          }
        }}



      >
        {
          content
        }
      </Swiper>
    </div>
  );
};

export default SinglePageSlider;
