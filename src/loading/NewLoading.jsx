import { Spin } from "antd";
// Import Ant Design styles


const NewLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spin className="custom-spinner" size="large" />
    </div>
  );
};

export default NewLoading;
