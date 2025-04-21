import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaFire } from "react-icons/fa";
import { Modal, Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import fol1 from "../../../assets/fol/1.jpeg";
import fol2 from "../../../assets/fol/2.jpeg";
import fol3 from "../../../assets/fol/3.jpeg";
import fol4 from "../../../assets/fol/4.jpeg";
import fol5 from "../../../assets/fol/5.jpeg";
import fol6 from "../../../assets/fol/6.jpeg";
import axios from "axios";

const FruitTreePackage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fruits = [
    { name: "বারি মালটা", image: fol1 },
    { name: "থাই মিষ্টি তেতুল", image: fol3 },
    { name: "সুপার আনার", image: fol4 },
    { name: "থাই ছফেদা", image: fol5 },
    { name: "থাই পেয়ারা", image: fol6 },
    { name: "সিডলেস লেবু", image: fol2 },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const validateBangladeshPhone = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("ফোন নম্বর দিন"));
    }
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(value)) {
      return Promise.reject(new Error("সঠিক ফোন নম্বর দিন (01XXXXXXXXX)"));
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const deliveryFee = 250;
      const packagePrice = 1099;
      const totalPrice = packagePrice + deliveryFee;

      const packageData = {
        package_name: "প্রিমিয়াম ফল গাছ প্যাকেজ",
        price: packagePrice,
        delivery_charge: deliveryFee,
        total_price: totalPrice,
        buyer_name: values.name,
        buyer_phone: values.phone,
        buyer_address: values.address,
      };

      const response = await axios.post(
        "https://aronno.advmhkabir.com/api/v1/package/add",
        packageData
      );

      if (response.data.success) {
        message.success("আপনার অর্ডার সফলভাবে জমা হয়েছে!");
        handleCancel();
      } else {
        message.error("অর্ডার জমা দেওয়া যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      message.error("একটি ত্রুটি হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 md:py-12 px-3 md:px-4 bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-8 md:mb-12">
          প্রিমিয়াম ফল গাছ প্যাকেজ
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full p-4"
        >
          <div className="relative bg-white rounded-xl shadow-md p-4">
            <div className="absolute -top-3 right-2 md:-top-4 md:-right-4 z-10">
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-lg flex items-center gap-1.5 md:gap-2 transform hover:scale-105 transition-transform duration-300">
                <FaFire className="animate-pulse text-sm md:text-base" />
                <span className="text-sm md:text-base font-medium">
                  হট অফার
                </span>
              </div>
            </div>

            <div className="text-center mb-6 md:mb-8">
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
                  ৬ টি কলমের ফল গাছ মাত্র{" "}
                  <span className="text-yellow-300">৳1099</span>
                </h3>
              </motion.div>
              <div className="flex items-center justify-center gap-2 md:gap-4">
                <span className="text-3xl md:text-4xl font-bold text-red-600">
                  ৳1099
                </span>
                <span className="text-lg md:text-xl text-gray-600 line-through">
                  ৳2200
                </span>
                <span className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-sm">
                  50% OFF
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {fruits.map((item, index) => (
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
                    <p className="text-green-600 font-bold text-sm md:text-base">
                      কলম চারা
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center"
            >
              <button
                onClick={showModal}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full text-base md:text-lg font-semibold shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                <FaShoppingCart className="text-sm md:text-base" />
                <span>এখনই কিনুন</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Modal
        title="অর্ডার ফর্ম"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={400}
        className="custom-modal"
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            প্রিমিয়াম ফল গাছ প্যাকেজ
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span>প্যাকেজ মূল্য:</span>
            <span className="font-bold">৳1099</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>ডেলিভারি চার্জ:</span>
            <span className="font-bold">৳250</span>
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <span className="font-bold">মোট মূল্য:</span>
            <span className="font-bold text-red-600">৳1349</span>
          </div>
        </div>

        <div className="mb-4 p-3 bg-green-50 rounded-md border border-green-200">
          <p className="text-green-800 font-medium text-center">
            লাইভ ছবি পেতে WhatsApp নাম্বারে যোগাযোগ করুন:{" "}
            <a
              href="https://wa.me/8801711258558"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 underline"
            >
              01711258558
            </a>
          </p>
        </div>

        <Form
          form={form}
          name="order"
          onFinish={onFinish}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "আপনার নাম লিখুন" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="আপনার নাম"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "আপনার ফোন নম্বর লিখুন" },
              { validator: validateBangladeshPhone },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="ফোন নম্বর (01XXXXXXXXX)"
              size="large"
              maxLength={11}
            />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[{ required: true, message: "আপনার ঠিকানা লিখুন" }]}
          >
            <Input.TextArea
              prefix={<EnvironmentOutlined />}
              placeholder="ঠিকানা"
              rows={3}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full bg-green-600 hover:bg-green-700"
              loading={isSubmitting}
            >
              {isSubmitting ? "জমা হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FruitTreePackage;
