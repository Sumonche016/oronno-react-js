import React, { useEffect, useRef, useState } from "react";
import { deleteProduct, getProduct } from "../../../Services/apiServices";
import DataTable from "react-data-table-component";
import { FiSearch } from "react-icons/fi";
import SaveButton from "../../../utils/Button/SaveButton";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../SharedComponent/Loading";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { FiEdit } from 'react-icons/fi'
import ConformationModal from "../../SharedComponent/ProductPage/MiniComponent/ConformationModal";
const ProductList = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState({
    delete: false,
    fetch: false,
  });


  const [confimModal, setConfirmModal] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  const navigate = useNavigate();

  const handleNaviagte = () => {
    navigate("/admin/addProduct");
  };

  const categoryColors = [
    { bg: "#ffdcdc", color: "#900" },
    { bg: "#def2d0", color: "#245900" },
    { bg: "#f9f1c8", color: "#5e4f00" },
  ];

  const randomCategoryColor = () => {
    const randomIndex = Math.floor(Math.random() * categoryColors.length);
    return categoryColors[randomIndex];
  };

  useEffect(() => {
    setLoader((prevState) => ({ ...prevState, fetch: true }));

    async function fetchProducts() {
      let response = await getProduct();
      if (response.data.success) {
        setAllProducts(response.data.data);
        setLoader((prevState) => ({ ...prevState, fetch: false }));
      }
    }

    fetchProducts();


  }, [loader.delete]);

  const handleDelete = async () => {
    setLoader((prevSate) => {
      return {
        ...prevSate,
        delete: true,
      };
    });

    let response = await deleteProduct(deleteId);

    if (response.data.success) {
      setLoader((prevSate) => {
        return {
          ...prevSate,
          delete: false,
        };
      });
      setConfirmModal(false)
      toast.success("Product Deleted Succesfully");
    }
  };


  const handleConfimModal = (id) => {
    setConfirmModal(true)
    setDeleteId(id)
  }

  const columns = [
    {
      name: "Images",
      selector: "product_images",
      cell: (row) => (
        <img
          className="w-[70px] h-[70px]"
          src={row.product_images}
          alt="Product"
        />
      ),
    },
    {
      name: "Title",
      selector: "product_title",

    },

    {
      name: "Price",
      selector: "product_price",
      cell: (row) => `${row.product_price} ৳`,
    },

    {
      name: "Category",
      selector: "product_category",
      cell: (cell) => {
        const { bg, color } = randomCategoryColor();
        return (
          <div
            style={{
              backgroundColor: bg,
              color: color,
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {cell.product_category}
          </div>
        );
      },
    },

    {
      name: "Action",
      selector: "order_status",
      style: {
        fontWeight: "500",
        textAlign: 'center'
      },
      cell: (row, index) => (
        <div>
          <div className="flex gap-4">
            <div onClick={() => navigate(`/admin/editProduct/${row._id}`)} className="bg-[#fef4d3] text-[#505050]  px-[12px] py-[8px] rounded-[5px] cursor-pointer" data-tooltip-id="Edit" data-tooltip-content="Edit">
              <Tooltip id="Edit" />
              <FiEdit className=" text-[16px]  " />
            </div>

            <div onClick={() => handleConfimModal(row._id)} className="bg-[#FF5771] px-[12px] py-[8px] rounded-[5px] cursor-pointer" data-tooltip-id="delete" data-tooltip-content="Delete">
              <Tooltip id="delete" />
              <RiDeleteBin2Fill className="text-white text-[16px]  " />
            </div>

          </div>

        </div >
      ),

    },
  ];

  const filteredProducts = allProducts.filter((product) =>
    product.product_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rowStyles = [
    {
      when: () => true,
      style: {
        padding: '10px',
      },
    },
  ];



  return (
    <div>

      {
        confimModal && <ConformationModal deleteFunction={handleDelete} setConfirmModal={setConfirmModal} />
      }
      <div className="flex justify-between my-4">
        <h1 className="text-[1.2rem] font-medium">All PRoduct</h1>

        <div>
          <SaveButton
            onClick={handleNaviagte}
            tittle={"New Product"}
            type={"submit"}
            background={"#ffd333"}
          ></SaveButton>
        </div>
      </div>
      <div className="p-6 bg-white  rounded-[10px]">
        <div className="mb-3 relative">
          <input
            type="text"
            className="w-full font-medium px-[0.8125rem] py-[0.375rem] form-control border rounded-[2px] h-9 border-input text-[14px] pl-8"
            placeholder="Search Product Here"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch
            size={20}
            className="absolute top-[.4rem] left-2 text-gray-400"
          />
        </div>

        {loader.fetch || loader.delete ? (
          <Loading />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={filteredProducts}
              pagination
              highlightOnHover
              striped

              conditionalRowStyles={rowStyles}

            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
