import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FiSearch } from "react-icons/fi";
import Loading from "../../../SharedComponent/Loading";
import axios from "axios";

const PackageOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [packageOrders, setPackageOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <DataTable
          columns={columns}
          data={filteredOrders}
          striped
          pagination
          conditionalRowStyles={rowStyles}
        />
      )}
    </div>
  );
};

export default PackageOrders;
