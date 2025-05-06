import React from "react";

const LandScapeTab = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-md transition-all ${
            selectedCategory === category.value
              ? "bg-[#059669] text-white"
              : "bg-white hover:bg-gray-200 text-gray-700"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default LandScapeTab;
