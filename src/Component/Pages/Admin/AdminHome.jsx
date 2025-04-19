import React, { useEffect } from "react";

const AdminHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='h-screen bg-[#F7F8FC]'>
      <h1>From admin home </h1>
    </div>
  );

};

export default AdminHome;
