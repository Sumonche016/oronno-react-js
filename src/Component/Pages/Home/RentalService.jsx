import image1 from "../../../assets/rental1.jpg";
import image2 from "../../../assets/rental2.jpg";
import image3 from "../../../assets/rental3.jpg";
import ContactUsButton from "../../ContactUsButton.jsx";


const RentalService = () => {
  const rentalPackages = [
    {
      title: "বেসিক প্যাকেজ",
      price: "৳৪,০০০/মাস",
      image: image1,
      features: ["৪০টি অফিস প্লান্ট", "মাসিক রক্ষণাবেক্ষণ", "ফ্রি ডেলিভারি"],
    },
    {
      title: "স্ট্যান্ডার্ড প্যাকেজ",
      price: "৳৫,০০০/মাস",
      image: image2,
      features: [
        "৫০টি অফিস প্লান্ট",
        "দ্বি-সাপ্তাহিক রক্ষণাবেক্ষণ",
        "ফ্রি ডেলিভারি",
      ],
    },
    {
      title: "প্রিমিয়াম প্যাকেজ",
      price: "৳৯,০০০/মাস",
      image: image3,
      features: [
        "১০০টি অফিস প্লান্ট",
        "সাপ্তাহিক রক্ষণাবেক্ষণ",
        "ফ্রি ডেলিভারি",
      ],
    },
    {
      title: "কাস্টম প্যাকেজ",
      price: "৳১৫০/প্লান্ট",
      image: image3,
      features: [
        "আপনার পছন্দ মতো প্লান্ট সংখ্যা",
        "সাপ্তাহিক রক্ষণাবেক্ষণ",
        "ফ্রি ডেলিভারি",
        "মিনিমাম ১০টি প্লান্ট",
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center mb-12 text-3xl text-[#212b36] font-semibold">
        অফিস প্লান্ট রেন্টাল সার্ভিস
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rentalPackages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-full h-48 overflow-hidden">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#212b36] mb-2">
                {pkg.title}
              </h3>
              <p className="text-2xl font-bold text-[#0D7A3E] mb-4">
                {pkg.price}
              </p>
              <ul className="mb-6 space-y-2">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2 text-[#0D7A3E]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <ContactUsButton />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalService;
