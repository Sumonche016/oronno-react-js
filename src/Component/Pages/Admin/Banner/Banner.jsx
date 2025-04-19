import React, { useEffect, useState } from "react";
import Slider from "../../../SharedComponent/Slider/Slider";
import { sliderImage } from "../../../../Routes/RoutesIndex";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetAllBannerQuery,
} from "../../../../Redux/banner/bannerApi";
import Loading from "../../../../loading/loading/Loading";

const Banner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    data: bannerData,
    isLoading: bannerIsLoading,
    isError: bannerIsError,
  } = useGetAllBannerQuery();

  // decide delete table data render
  let deleteTableData = null;
  if (bannerIsLoading) {
    deleteTableData = <div>Loading</div>;
  }
  if (!bannerIsLoading && bannerIsError) {
    deleteTableData = <div>something is wrong</div>;
  }
  if (!bannerIsLoading && bannerData?.result.length > 0) {
    deleteTableData = bannerData.result.map((sData, i) => (
      <tr key={sData._id} className="bg-green-50 border-b">
        <th
          scope="row"
          className="px-2 md:px-6 py-2 text-lg font-semibold text-left text-gray-600 whitespace-nowrap"
        >
          {i + 1}
        </th>
        <td className="px-2 md:px-6 py-2">
          <img className="w-40 min-h-[2rem]" src={sData.url} alt="" />
        </td>
        <td className="px-2 md:px-6 py-2">
          <button type="button" onClick={() => handleBannerImg(sData._id)}>
            <MdDelete className="text-2xl text-red-500 hover:text-red-700 ease-in-out duration-200" />
          </button>
        </td>
      </tr>
    ));
  }

  // handle add banner
  const [addImageFN, { data: addData, isLoading, isError }] =
    useAddBannerMutation();
  const [imgUploadLoading, setImageUploadLoading] = useState(false);
  const handleImageAdd = async (e) => {
    setImageUploadLoading(true);
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_REACT_APP_IMAGE_BB_API_KEY
    }`;
    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      await addImageFN(result.data.display_url);
      setImageUploadLoading(false);
      toast.success("Image upload Successful");
    } catch (error) {
      console.log(error.message);
      setImageUploadLoading(false);
      toast.error("Upload fail");
    }
  };

  // handle delete banner img
  const [deleteBannerFN] = useDeleteBannerMutation();
  const handleBannerImg = (_id) => {
    // removed function hear
    deleteBannerFN(_id);
  };

  return (
    <div>
      <h1 className="my-6 text-2xl font-semibold text-primary-text">
        Banner Preview{" "}
      </h1>
      <Slider />

      <div className="flex flex-col md:flex-row gap-x-6 my-10 items-start">
        {/* img upload */}
        <div className="flex items-center justify-center w-full max-w-2xl">
          {!imgUploadLoading ? (
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-700 ">
                  PNG, JPG || Recommend Size (hight-418 width-1200)
                </p>
              </div>
              <input
                id="dropzone-file"
                accept=".png, .jpg, .jpeg"
                type="file"
                className="hidden"
                onChange={handleImageAdd}
              />
            </label>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
              <div className="w-24 h-24">
                <Loading />
              </div>
            </div>
          )}
        </div>
        {/* banner table */}

        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{deleteTableData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Banner;
