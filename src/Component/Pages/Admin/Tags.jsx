import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";

const Tags = ({ englishTag, setEnglishTags, banglaTags, setBanglaTags }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleEnglishSubmit = (data) => {
    const id = Math.floor(Math.random() * 100);
    const newTag = { id: id, tag: data.englishTag };
    setEnglishTags((prevTags) => [...prevTags, newTag]);
  };

  const handleBanglaSubmit = (data) => {
    const id = Math.floor(Math.random() * 100);
    const newTag = { id: id, tag: data.banglaTag };
    setBanglaTags((prevTags) => [...prevTags, newTag]);
  };

  const handleKeyDownEnglish = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleEnglishSubmit)();
      reset();
    }
  };

  const handleKeyDownBangla = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleBanglaSubmit)();
      reset();
    }
  };

  const handleDeleteTag = (id) => {
    const updateArray = englishTag.filter((element) => element.id !== id);
    setEnglishTags(updateArray);
  };

  const handleDeleteTagBangla = (id) => {
    const updateArray = banglaTags.filter((element) => element.id !== id);
    setBanglaTags(updateArray);
  };

  return (
    <div className="bg-white border-primary rounded-[10px] p-5">
      <h1 className=" mb-5 ">Tags</h1>

      <div className="flex gap-2 text-[15px] font-medium">
        {englishTag.length !== 0 &&
          englishTag?.map((element) => {
            return (
              <div
                key={element.id}
                className="bg-[#E6E6E6]  rounded-[2px] flex items-center"
              >
                <p className="p-[3px] pl-[6px]"> {element.tag}</p>
                <div
                  onClick={() => handleDeleteTag(element.id)}
                  className="hover:bg-[#FFBDAD] hover:text-[#DE350B] h-full flex justify-center items-center"
                >
                  <RxCross2 className="hover:text-[#DE350B] p-[4px]" />
                </div>
              </div>
            );
          })}
      </div>

      <div>
        <form onsubmit={handleSubmit(handleEnglishSubmit)}>
          <div>
            <label
              htmlFor="englishTag"
              className="text-[0.875rem] mb-1 inline-block font-medium"
            >
              English Tag
            </label>

            <input
              onKeyDown={handleKeyDownEnglish}
              {...register("englishTag")}
              className="w-full font-medium text-[15px]  px-[0.8125rem] py-[0.375rem]  form-control border rounded-[2px] h-8 border-input "
              type="text"
              id="englishTag"
            />
          </div>
        </form>
      </div>

      {/* for bangla  */}

      <form onsubmit={handleSubmit(handleBanglaSubmit)} className="mt-4">
        <div>
          <label
            htmlFor="englishTag"
            className="text-[0.875rem] mb-1 inline-block font-medium"
          >
            Bangla
          </label>

          <div className="flex my-2 gap-2 text-[15px] font-medium">
            {banglaTags.length !== 0 &&
              banglaTags?.map((element) => {
                return (
                  <div
                    key={element.id}
                    className="bg-[#E6E6E6]  rounded-[2px] flex items-center"
                  >
                    <p className="p-[3px] pl-[6px]"> {element.tag}</p>
                    <div
                      onClick={() => handleDeleteTagBangla(element.id)}
                      className="hover:bg-[#FFBDAD] hover:text-[#DE350B] h-full flex justify-center items-center"
                    >
                      <RxCross2 className="hover:text-[#DE350B] p-[4px]" />
                    </div>
                  </div>
                );
              })}
          </div>

          <input
            onKeyDown={handleKeyDownBangla}
            {...register("banglaTag")}
            className="w-full font-medium px-[0.8125rem] text-[15px]  py-[0.375rem]  form-control border rounded-[2px] h-8 border-input "
            type="text"
            id="banglaTag"
          />
        </div>
      </form>
    </div>
  );
};

export default Tags;
