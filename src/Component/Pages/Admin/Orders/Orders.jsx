import { useState } from "react";
import DataTable from "react-data-table-component";
import { FiSearch } from "react-icons/fi";
import {
  useAllOdderQuery,
  useUpdateOrderStatusMutation,
} from "../../../../Redux/odder/odderApi";
import { convertDateFormat } from "../../../../utils/formateData";
import Loading from "../../../SharedComponent/Loading";
import { MdOutlineLocalShipping } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { MdDetails } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PackageOrders from "./PackageOrders";

const Orders = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  const { data: allOderData, isLoading } = useAllOdderQuery();

  const [
    updateFN,
    { data: updateData, isLoading: isLoadingUpdate, isError: isErrorUpdate },
  ] = useUpdateOrderStatusMutation();

  const navigate = useNavigate();

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

  const updateStatus = (id, status) => {
    const payload = {
      id: id,
      status: status,
    };

    updateFN(payload);
  };

  const rowStyles = [
    {
      when: () => true,
      style: {
        padding: "10px",
      },
    },
  ];

  const columns = [
    {
      name: "Order ID",
      style: {
        fontWeight: "500",
      },
      cell: (row) => `${row?._id}`,
    },

    {
      name: "Customer Name",
      style: {
        fontWeight: "500",
      },
      cell: (row) => `${row?.address?.name} `,
    },
    {
      name: "Date",

      style: {
        fontWeight: "500",
      },
      cell: (row) => `${convertDateFormat(row.createdAt)}`,
    },
    {
      name: "Phone",
      selector: "Phone",
      style: {
        fontWeight: "500",
      },
      cell: (row) => `${row?.address?.phone} `,
    },

    {
      name: "Items",
      selector: "items",
      style: {
        fontWeight: "500",
      },
      cell: (row) =>
        `${row.products.reduce((acc, obj) => acc + obj?.quantity, 0)} items`,
    },

    {
      name: "Price",
      selector: "Price",
      style: {
        fontWeight: "500",
      },
      cell: (row) =>
        `${
          row.products.reduce((acc, obj) => acc + obj?.totalPrice, 0) + 100
        } ৳`,
    },

    {
      name: "Action",
      selector: "order_status",
      style: {
        fontWeight: "500",
        textAlign: "center",
      },
      cell: (row, index) => (
        <div>
          <div className="flex gap-4">
            <div
              onClick={() => updateStatus(row._id, "confirmed")}
              data-tooltip-id="confirmed"
              data-tooltip-content="confirmed"
              className="bg-[#0C4BCC] px-[12px] py-[8px] rounded-[5px] cursor-pointer"
            >
              <Tooltip id="confirmed" />

              <GiConfirmed className="text-white text-[16px]  " />
            </div>

            <div
              onClick={() => updateStatus(row._id, "delivered")}
              data-tooltip-id="delivered"
              data-tooltip-content="delivered"
              className="bg-[#FF5771] px-[12px] py-[8px] rounded-[5px] cursor-pointer"
            >
              <Tooltip id="delivered" />
              <MdOutlineLocalShipping className="!text-white text-[16px]  " />
            </div>

            <div
              onClick={() => navigate(`/admin/orders/${row._id}`)}
              data-tooltip-id="details"
              data-tooltip-content="details"
              className="bg-[#3ab559] px-[12px] py-[8px] rounded-[5px] cursor-pointer"
            >
              <Tooltip id="details" />
              <MdDetails className="!text-white text-[16px]  " />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const filterOrder = allOderData?.data
    ?.filter((item) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      const { address, _id } = item;
      return (
        address?.name?.toLowerCase().includes(searchTermLowerCase) ||
        address?.phone?.toLowerCase().includes(searchTermLowerCase) ||
        _id.toLowerCase().includes(searchTermLowerCase)
      );
    })
    .reverse();

  return (
    <div className="p-6 bg-white rounded-[10px]">
      <div className="flex mb-4 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "products"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "package"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("package")}
        >
          Package
        </button>
      </div>

      {activeTab === "products" ? (
        <>
          <div className="mb-3 relative">
            <input
              type="text"
              className="w-full font-medium px-[0.8125rem] py-[0.375rem] form-control border rounded-[2px] h-9 border-input text-[14px] pl-8"
              placeholder="Search Orders Here"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch
              size={16}
              className="absolute top-[.6rem] left-2 text-gray-400"
            />
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <DataTable
              columns={columns}
              data={filterOrder}
              striped
              pagination
              conditionalRowStyles={rowStyles}
            />
          )}
        </>
      ) : (
        <PackageOrders />
      )}
    </div>
  );
};

export default Orders;
