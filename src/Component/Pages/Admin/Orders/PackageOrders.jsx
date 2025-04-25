import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiSearch, FiEye } from "react-icons/fi";
import Loading from "../../../SharedComponent/Loading";
import axios from "axios";

const PackageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packageOrders, setPackageOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPackageOrders = async () => {
      try {
        const response = await axios.get(
          "https://aronno.advmhkabir.com/api/v1/package/all"
        );
        if (response.data?.success) {
          setPackageOrders(response.data.packages || []);
        }
      } catch (error) {
        console.error("Error fetching package orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackageOrders();
  }, []);

  const columns = [
    {
      name: "Package Name",
      selector: "package_name",
      style: {
        fontWeight: "500",
      },
    },
    {
      name: "Buyer Name",
      selector: "buyer_name",
      style: {
        fontWeight: "500",
      },
    },
    {
      name: "Phone",
      selector: "buyer_phone",
      style: {
        fontWeight: "500",
      },
    },
    {
      name: "Address",
      selector: "buyer_address",
      style: {
        fontWeight: "500",
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    {
      name: "Package Price",
      selector: "price",
      style: {
        fontWeight: "500",
      },
      cell: (row) => `${row.price} ৳`,
    },
    {
      name: "Delivery Charge",
      selector: "delivery_charge",
      style: {
        fontWeight: "500",
      },
      cell: (row) => `${row.delivery_charge} ৳`,
    },
    {
      name: "Total Price",
      selector: "total_price",
      style: {
        fontWeight: "500",
      },
      cell: (row) => `${row.total_price} ৳`,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => {
            setSelectedOrder(row);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
        >
          <FiEye size={16} />
          Details
        </button>
      ),
    },
  ];

  const filteredOrders = packageOrders?.filter((order) => {
    const searchTermLowerCase = searchTerm?.toLowerCase();
    return (
      order.package_name?.toLowerCase().includes(searchTermLowerCase) ||
      order.buyer_name?.toLowerCase().includes(searchTermLowerCase) ||
      order.buyer_phone?.toLowerCase().includes(searchTermLowerCase)
    );
  });

  const rowStyles = [
    {
      when: () => true,
      style: {
        padding: "10px",
      },
    },
  ];

  return (
    <div className="p-6 bg-white rounded-[10px]">
      <div className="mb-3 relative">
        <input
          type="text"
          className="w-full font-medium px-[0.8125rem] py-[0.375rem] form-control border rounded-[2px] h-9 border-input text-[14px] pl-8"
          placeholder="Search Package Orders Here"
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
        <>
          <DataTable
            columns={columns}
            data={filteredOrders}
            striped
            pagination
            conditionalRowStyles={rowStyles}
          />

          {/* Modal */}
          {isModalOpen && selectedOrder && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Order Details</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Package Name</h3>
                    <p className="mt-1">{selectedOrder.package_name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">
                      Buyer Information
                    </h3>
                    <p className="mt-1">Name: {selectedOrder.buyer_name}</p>
                    <p className="mt-1">Phone: {selectedOrder.buyer_phone}</p>
                    <p className="mt-1">
                      Address: {selectedOrder.buyer_address}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Price Details</h3>
                    <p className="mt-1">
                      Package Price: {selectedOrder.price} ৳
                    </p>
                    <p className="mt-1">
                      Delivery Charge: {selectedOrder.delivery_charge} ৳
                    </p>
                    <p className="mt-1 font-semibold">
                      Total Price: {selectedOrder.total_price} ৳
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PackageOrders;
