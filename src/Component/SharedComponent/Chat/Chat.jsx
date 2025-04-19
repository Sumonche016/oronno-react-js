import React from "react";

const Chat = () => {
  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: "v17.0",
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  return (
    <div>
      <div id="fb-root"></div>
      <div
        page_id={import.meta.env.VITE_REACT_APP_PAGE_ID}
        attribution={import.meta.env.VITE_REACT_APP_ATTRIBUTION}
        id="fb-customer-chat"
        className="fb-customerchat"
      ></div>
    </div>
  );
};

export default Chat;


