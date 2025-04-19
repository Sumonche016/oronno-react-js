import React from "react";
 // We’ll define the keyframes in a CSS file
import image1 from "../../../assets/slides1.jpg";
import image2 from "../../../assets/slides2.jpg";
import image3 from "../../../assets/slides3.jpg";
import image4 from "../../../assets/slides4.jpg";
import image5 from "../../../assets/slides5.jpg";
import image6 from "../../../assets/slides6.jpg";
import image7 from "../../../assets/slides7.jpg";
import image8 from "../../../assets/slides8.jpg";

const TrustedCompany = () => {
  const companies = [
    { id: 1, name: "Company 1", logo: image1 },
    { id: 2, name: "Company 2", logo: image2 },
    { id: 3, name: "Company 3", logo: image3 },
    { id: 4, name: "Company 4", logo: image4 },
    { id: 5, name: "Company 5", logo: image5 },
    { id: 6, name: "Company 6", logo: image6 },
    { id: 7, name: "Company 7", logo: image7 },
    { id: 8, name: "Company 8", logo: image8 },
  ];

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Trusted By Leading Companies
      </h2>

      <div className="relative overflow-hidden">
        <div
          className="flex"
          style={{
            width: "fit-content",
            animation: "scroll 10s linear infinite",
          }}
        >
          {companies.concat(companies).map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-8 flex-shrink-0"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-24 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Add Tailwind-compatible animation directly in JSX */}
    <style>{`
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  </section>
  );
};

export default TrustedCompany;
