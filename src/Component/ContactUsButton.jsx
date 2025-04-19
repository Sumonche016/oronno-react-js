import React, { useState } from "react";
import { Modal, Button } from "antd";
import { MdContactPhone } from "react-icons/md";
import whatsapp from "../assets/Images/whatsapp.png";
import messenger from "../assets/Images/messnger.png";
import call from "../assets/Images/call.png";

const ContactUsButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const phoneNumber = "+8801711258558";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const handleMessengerClick = () => {
    window.open("https://m.me/61561305989542", "_blank");
  };

  const handleDirectCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="text-center mt-4 py-3">
      <div className="text-center flex justify-center">
        <button
          onClick={showModal}
          className="px-8 py-3 bg-primary-green flex items-center gap-2 justify-center text-white font-medium rounded-md shadow-sm"
        >
          <MdContactPhone /> Contact Us
        </button>
      </div>

      <Modal
        title="Contact Options"
        open={isModalVisible}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col space-y-4">
          <Button
            icon={<img src={whatsapp} alt="WhatsApp" width={30} height={30} />}
            size="large"
            className="flex justify-center"
            onClick={handleWhatsAppClick}
          >
            WhatsApp Message
          </Button>
          <Button
            className="flex justify-center"

            icon={<img src={messenger} alt="Messenger" width={30} height={30} />}
            size="large"
            onClick={handleMessengerClick}
          >
            Messenger
          </Button>
          <Button
            className="flex justify-center"

            icon={<img src={call} alt="Call" width={30} height={30} />}
            size="large"
            onClick={handleDirectCallClick}
          >
            Direct Call
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactUsButton;
