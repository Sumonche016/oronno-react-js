import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAddReviewMutation } from "../../../../Redux/product/productApi";

const AddReviewModal = ({ onClose, refetch }) => {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  // console.log(id)
  const [addNewReviewFN, { isSuccess }] = useAddReviewMutation();

  if (isSuccess) {
    refetch();
  }

  // data?.product.product_review && setReviews(data?.product.product_review);

  const handleFormSubmit = async (data) => {
    const sendData = {
      user_name: data.name,
      product_review: data.review,
      rating_star: rating,
    };

    await addNewReviewFN({ productID: id, updatedData: sendData });

    // console.log(sendData);
    reset();
    setRating(0);
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`popup`}>
      <div className="modal-empty-div"></div>
      <div
        className={`content-container top-[24rem] md:w-[50vw] w-[90vw] flex justify-center items-center`}
      >
        <div
          className={`w-full popup-content min-h-full`}
          style={{ backgroundColor: "white" }}
        >
          <div className="flex justify-between items-center radius-top bg-white border-b border-primary p-4">
            <h1 className=" font-medium">Submit Review</h1>
            <button
              onClick={onClose}
              className=" hover:text-[#1991eb] hover:bg-[#e8eef4] text-[30px] w-[20px] h-[20px] flex justify-center items-center"
            >
              &times;
            </button>
          </div>

          <div className="flex items-center justify-center p-4 z-50">
            <div className="bg-white text-primary-black relative  w-full ">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="border border-input focus:border-primary-green focus:outline-none rounded-md px-3 py-2 w-full"
                    placeholder="Enter your name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      Name is required
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="rating"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Rating:
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((option) => (
                      <input
                        key={option}
                        type="button"
                        value={option}
                        onClick={() => setRating(option)}
                        className={`border border-input rounded-md cursor-pointer focus:border-primary-green focus:outline-none px-3 py-2 ${rating === option
                            ? "bg-primary-green text-white"
                            : "bg-white"
                          } transition-colors duration-200`}
                      />
                    ))}
                  </div>
                  {errors?.rating && (
                    <p className="text-red-500 text-sm mt-1">
                      Rating is required
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="review"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Review:
                  </label>
                  <textarea
                    cols="30"
                    rows="5"
                    id="review"
                    className="border border-input focus:border-primary-green focus:outline-none rounded-md p-2 w-full  resize-none"
                    placeholder="Enter your review"
                    {...register("review", { required: true })}
                  />
                  {errors?.review && (
                    <p className="text-red-500 text-sm mt-1">
                      Review is empty, please write something
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`bg-primary-green ${rating == 0 ? "disabled" : ""
                      }  text-white px-4 py-2 rounded-sm`}
                  >
                    Add Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
