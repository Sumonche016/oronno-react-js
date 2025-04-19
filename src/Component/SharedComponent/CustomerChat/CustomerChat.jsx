import React from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";

const CustomerChat = () => {
  return (
    <div>
      <MessengerCustomerChat
        pageId={import.meta.env.VITE_REACT_APP_PAGE_ID}
        appId={import.meta.env.VITE_REACT_APP_APP_ID}
      />
    </div>
  );
};

export default CustomerChat;
