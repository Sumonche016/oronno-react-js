import React, { useState, useEffect } from "react";

import LandScapeTab from "./LandScapeTab";
import ContactUsButton from "../../ContactUsButton";

const LandScapeing = () => {
  const [selectedCategory, setSelectedCategory] = useState("অফিস ইন্টেরিয়র");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "অফিস ইন্টেরিয়র", value: "অফিস ইন্টেরিয়র" },

    { name: "ছাদ বাগান", value: "ছাদ বাগান" },
    { name: "রেস্টুরেন্ট ইন্টেরিয়র", value: "রেস্টুরেন্ট ইন্টেরিয়র" },
    {
      name: "রিসোর্ট ল্যান্ডস্ক্যাপ ডিজাইন",
      value: "রিসোর্ট ল্যান্ডস্ক্যাপ ডিজাইন",
    },
    { name: "ফ্যাক্টরি গ্রীন প্রজেক্ট", value: "ফ্যাক্টরি গ্রীন প্রজেক্ট" },
    { name: "বেলকনি বাগান", value: "বেলকনি বাগান" },
    { name: "হোম গ্রীন ডেকোর", value: "হোম গ্রীন ডেকোর" },
    { name: "আমাদের প্রজেক্ট", value: "আমাদের প্রজেক্ট" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://aronno.advmhkabir.com/api/v1/product/findProductByLandscape?landScape=${selectedCategory}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div id="landscape" className="md:w-[80%] w-[95%] mx-auto py-[5rem]">
      <div className="mb-6">
        <h1 className="text-center mb-4 text-3xl text-primary-text font-semibold text-[#212b36]">
          ল্যান্ডস্কেপিং প্রজেক্ট
        </h1>

        <LandScapeTab
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {products.map((item, index) => (
            <div key={index} className="bg-white shadow-md p-3 rounded-[5px]">
              <img
                className="rounded-md w-full h-auto"
                src={item.product_images}
                alt={item.product_title}
              />
              <ContactUsButton />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandScapeing;
