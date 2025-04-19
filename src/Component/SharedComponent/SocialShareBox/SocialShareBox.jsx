import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaFacebookMessenger,
} from "react-icons/fa";

const SocialShareBox = ({ isOpen, setIsOpen, carnetPageLocation }) => {
  if (!isOpen) {
    return null;
  }

  const handleClose = (e) => {
    if (e.target.id === "modal") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={handleClose}
        id="modal"
        className="fixed inset-0 z-[555] bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="w-full md:w-[25rem] mx-auto ">
          <div className=" p-5 rounded-lg shadow bg-white">
            <div className="mb-4 pb-4 text-xl font-semibold text-primary-text border-b-2 border-primary flex justify-center">
              <h1>পণ্যটি শেয়ার করুন </h1>
            </div>
            <div className="flex">
              <ul className="flex flex-wrap">
                <li>
                  <FacebookShareButton url={carnetPageLocation}>
                    <div className="inline-flex items-center m-2 px-3 py-1 rounded-full bg-facebook text-sm text-primary-white hover:scale-110 duration-100 ease-out cursor-pointer">
                      <span>
                        <FaFacebookF className="w-auto h-4 mr-2 fill-current text-primary-white" />
                      </span>
                      Facebook
                    </div>
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton url={carnetPageLocation}>
                    <div className="inline-flex items-center m-2 px-3 py-1 rounded-full bg-Twitter text-sm text-primary-white hover:scale-110 duration-100 ease-out cursor-pointer">
                      <span>
                        <FaTwitter className="w-auto h-4 mr-2 fill-current text-primary-white" />
                      </span>
                      Twitter
                    </div>
                  </TwitterShareButton>
                </li>
                <li>
                  <WhatsappShareButton url={carnetPageLocation}>
                    <div className="inline-flex items-center m-2 px-3 py-1 rounded-full bg-Whatsapp text-sm text-primary-white hover:scale-110 duration-100 ease-out cursor-pointer">
                      <span>
                        <FaWhatsapp className="w-auto h-4 mr-2 fill-current text-primary-white" />
                      </span>
                      Whatsapp
                    </div>
                  </WhatsappShareButton>
                </li>
                <li>
                  <FacebookMessengerShareButton url={carnetPageLocation}>
                    <div className="inline-flex items-center m-2 px-3 py-1 rounded-full bg-messenger text-sm text-primary-white hover:scale-110 duration-100 ease-out cursor-pointer">
                      <span>
                        <FaFacebookMessenger className="w-auto h-4 mr-2 fill-current text-primary-white" />
                      </span>
                      Messenger
                    </div>
                  </FacebookMessengerShareButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialShareBox;
