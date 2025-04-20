import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaFire } from "react-icons/fa";
import pakage1 from "../../../assets/indoor/indor1.jpeg";
import pakage2 from "../../../assets/indoor/indoor2.jpeg";
import pakage3 from "../../../assets/indoor/indor3.jpeg";
import pakage4 from "../../../assets/indoor/indor4.jpeg";
import pakage5 from "../../../assets/indoor/indoor5.jpeg";
import fol1 from "../../../assets/fol/1.jpeg";
import fol2 from "../../../assets/fol/2.jpeg";
import fol3 from "../../../assets/fol/3.jpeg";
import fol4 from "../../../assets/fol/4.jpeg";
import fol5 from "../../../assets/fol/5.jpeg";
import fol6 from "../../../assets/fol/6.jpeg";

const Pakage = () => {
  const plants = [
    { name: "  ফিলডেনড্রন মুনলাইট", image: pakage1 },
    { name: "মনষ্টেরা আদানসনি", image: pakage2 },
    { name: "এনজয় পোথস ", image: pakage3 },
    { name: "ফিলডেনড্রন লেমন লাইম", image: pakage4 },
    { name: "ফিলডেনড্রন ব্রাসিল", image: pakage5 },
  ];

  const fruits = [
    { name: "বারি মালটা", image: fol1 },
    { name: "সিডলেস লেবু", image: fol2 },
    { name: "থাই মিষ্টি তেতুল", image: fol3 },
    { name: "সুপার আনার", image: fol4 },
    { name: "থাই ছফেদা", image: fol5 },
    { name: "থাই পেয়ারা", image: fol6 },
  ];

  const renderPackage = (items, title, price, discount, isPlants = true) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`w-full lg:w-1/2 p-4 
      }`}
    >
      <div className="relative bg-white rounded-xl shadow-md p-4">
        {/* Hot Offer Badge - Repositioned and Responsive */}
        <div className="absolute -top-3 right-2 md:-top-4 md:-right-4 z-10">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-lg flex items-center gap-1.5 md:gap-2 transform hover:scale-105 transition-transform duration-300">
            <FaFire className="animate-pulse text-sm md:text-base" />
            <span className="text-sm md:text-base font-medium">হট অফার</span>
          </div>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
            {title}
          </h2>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white p-3 md:p-4 rounded-lg shadow-xl mb-4"
          >
            <h3 className="text-xl md:text-2xl font-bold">
              {isPlants
                ? "পট সহ ৫ টি প্রিমিয়াম ইনডোর প্লান্ট মাত্র"
                : "৬ টি কলমের ফল গাছ মাত্র"}{" "}
              <span className="text-yellow-300">{price}</span>
            </h3>
          </motion.div>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <span className="text-3xl md:text-4xl font-bold text-red-600">
              {price}
            </span>
            <span className="text-lg md:text-xl text-gray-600 line-through">
              {discount}
            </span>
            <span className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-sm">
              50% OFF
            </span>
          </div>
        </div>

        <div
          className={`grid ${
            isPlants
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          } gap-3 md:gap-4 mb-6 md:mb-8`}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-2 transform hover:scale-105 transition-transform duration-300"
                  style={{ objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>
              <div className="p-2 md:p-3 bg-white">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                  {item.name}
                </h3>
                {!isPlants && (
                  <p className="text-green-600 font-bold text-sm md:text-base">
                    কলম চারা
                  </p>
                )}
                {isPlants && (
                  <p className="text-green-600 text-sm md:text-base">
                    ৫'' পট সহ
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-center"
        >
          <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full text-base md:text-lg font-semibold shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
            <FaShoppingCart className="text-sm md:text-base" />
            <span>এখনই কিনুন</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="py-6 md:py-12 px-3 md:px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8 md:mb-12">
          হট অফার প্যাকেজ
        </h1>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {renderPackage(
            plants,
            "প্রিমিয়াম ইনডোর প্লান্ট প্যাকেজ",
            "৳499",
            "৳999",
            true
          )}
          {renderPackage(
            fruits,
            "প্রিমিয়াম ফল গাছ প্যাকেজ",
            "৳999",
            "৳1999",
            false
          )}
        </div>
      </div>
    </div>
  );
};

export default Pakage;
