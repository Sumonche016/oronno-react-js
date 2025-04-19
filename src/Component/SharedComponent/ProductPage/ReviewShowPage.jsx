import React, { useEffect, useState } from "react";
import { BiUserVoice } from "react-icons/bi";
import ProductPageLoading from "../../../loading/ProductPageLoading";
import { useGetSingleProductQuery } from "../../../Redux/product/productApi";
import AddReviewModal from "./MiniComponent/AddReviewModal";
import userIcon from "../../../assets/Images/man (1).png";
import ModalComponenet from "./MiniComponent/ModalComponent";

const ReviewShowPage = (props) => {
  const { singleProductID } = props || {};
  console.log(singleProductID);
  const { data, isLoading, isError, refetch } =
    useGetSingleProductQuery(singleProductID);

  console.log("showbox->", data?.reviews?.product_review);

  let content = null;
  if (isLoading) {
    content = <ProductPageLoading />;
  }
  if (!isLoading && isError) {
    content = <h1>Error</h1>;
  }
  const reversedArray = [...(data?.reviews?.product_review || [])].reverse();
  if (!isLoading && data?.reviews?.product_review) {
    content = reversedArray?.map((review, index) => {
      // Date calculations and message generation
      const currentDate = new Date();
      const formattedDate = review?.date
        ? new Date(review.date).toLocaleDateString()
        : "";
      const timeDifference = currentDate - new Date(review?.date);
      const secondsDifference = Math.floor(timeDifference / 1000);
      const minutesDifference = Math.floor(secondsDifference / 60);
      const hoursDifference = Math.floor(minutesDifference / 60);
      const daysDifference = Math.floor(hoursDifference / 24);
      const showDate = formattedDate;
      let message = `${secondsDifference} seconds ago.`;
      if (secondsDifference > 59) {
        message = `${minutesDifference} minutes ago.`;
      }
      if (minutesDifference > 59) {
        message = `${hoursDifference} hours ago.`;
      }
      if (hoursDifference > 23) {
        message = `${daysDifference} days ago.`;
      }
      // console.log(message);

      return (
        <li key={review?._id} className="border bg-white border-primary p-4 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center mt-4 space-x-4">
              <div>
                <img src={userIcon} className="w-[40px]" alt="" />
              </div>

              <div>
                <p className=" font-medium text-[17px] capitalize">
                  {review?.name}
                </p>
                {/* <p className="text-sm dark:text-gray-200">Date: {showDate}</p> */}
                <p className="text-[12px] text-gray-600 font-medium">
                  {" "}
                  {message}
                </p>
              </div>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 fill-current ${
                    star <= review.rating_star
                      ? "text-yellow-800"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1L7.243 6.458 1.886 7.027l5.365 4.632L6.514 18 10 14.125l3.486 3.875-.737-6.341L18.114 7.03 12.757 6.46z"
                  />
                </svg>
              ))}
            </div>
          </div>
          <div>
            <div className="mt-3">
              <p className="text-sm text-gray-600 font-medium">
                {review?.review}
              </p>
            </div>
          </div>
        </li>
      );
    });
  }

  // console.log(reviews);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="container mx-auto pt-[5rem]">
      <div className="p-4">
        {modalOpen && (
          <AddReviewModal
            refetch={refetch}
            onClose={() => setModalOpen(false)}
          />
        )}

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium mb-2">Reviews:</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-primary-red text-white px-4 py-2 rounded mb-4"
            >
              Add Review
            </button>
          </div>
          <ul className="space-y-2">{content}</ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewShowPage;
