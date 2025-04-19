import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../../Services/apiServices";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { formatTime } from "../../../utils/FormatingTime";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [singleOrderData, setSingleOrderData] = useState([]);

  const statusShow = (status) => {
    if (status == "delivered") {
      return <h1 className="text-[#e5f448] bg-[#2e312b] badge">Delivered</h1>;
    } else if (status == "confirmed") {
      return <h1 className="text-[#245900] bg-[#def2d0] badge">Confirmed</h1>;
    } else if (status == "pending") {
      return <h1 className="text-[#004b9a] bg-[#d9ecff] badge">Pending</h1>;
    } else {
      return <h1 className="text-[#900] bg-[#ffdcdc] badge">Canceled</h1>;
    }
  };

  useEffect(() => {
    async function fetchSingleOrder() {
      let response = await getSingleOrder(orderId);
      if (response.data.success) {
        setSingleOrderData(response.data.data);
      }
    }

    fetchSingleOrder();
  }, []);

  const columns = [
    {
      name: "Product Image",
      selector: "product_images",
      style: {
        fontWeight: "500",
        textAlign: "center",
      },
      cell: (row) => (
        <img
          className="w-[70px] h-[70px] rounded-[10px]"
          src={row.product_images}
          alt="Product"
        />
      ),
    },
    {
      name: "Items Summary",
      selector: "product_title",
    },
    {
      name: "Quantity",
      selector: "quantity",
    },
    {
      name: "Price",
      selector: "product_price",
    },
    {
      name: "Total Price",
      selector: "totalPrice",
    },
  ];

  const rowStyles = [
    {
      when: () => true,
      style: {
        padding: "5px",
      },
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-[1.2rem] font-medium">
          Order Id : <span className="text-primary-deep-green">{orderId}</span>
        </h1>

        <div className="flex gap-4 pt-6">
          <div className="w-[60%] ">
            <div className="bg-white rounded-[10px]">
              <DataTable
                columns={columns}
                data={singleOrderData?.products}
                highlightOnHover
                striped
                customStyles={{
                  height: "100%",
                  fontWeight: "500",
                }}
                conditionalRowStyles={rowStyles}
              />
            </div>

            <div className="bg-white rounded-[10px] mt-6 p-4">
              <h1 className="text-[15px] font-medium ">Customer Details:</h1>
              <div className=" text-[14px] mt-4 font-medium flex justify-between">
                <h1>Customer Name</h1>
                <h1>{singleOrderData?.address?.name}</h1>
              </div>

              <div className=" text-[14px] mt-4 font-medium flex justify-between">
                <h1>Phone Number</h1>
                <h1>{singleOrderData?.address?.phone}</h1>
              </div>
              <div className=" text-[14px] mt-4 font-medium flex justify-between">
                <h1>Delivary Address</h1>
                <h1>{singleOrderData?.address?.address}</h1>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <div className="bg-white rounded-[10px] p-4">
              <div className=" text-[14px] font-medium flex justify-between">
                <h1>Order Summary:</h1>
                <h1>{statusShow(singleOrderData?.order_status)}</h1>
              </div>
              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Order Created</h1>
                <h1>{formatTime(singleOrderData?.createdAt)}</h1>
              </div>

              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Product price</h1>
                <h1>
                  {singleOrderData?.products?.reduce(
                    (acc, obj) => acc + obj?.totalPrice,
                    0
                  )}{" "}
                  ৳
                </h1>
              </div>

              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Delivary Fee</h1>
                <h1>100৳</h1>
              </div>

              <div className="flex items-center mt-4 justify-between text-[14px] font-medium">
                <h1>Sub Total</h1>
                <h1>
                  {singleOrderData?.products?.reduce(
                    (acc, obj) => acc + obj?.totalPrice,
                    0
                  ) + 100}
                  ৳
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
