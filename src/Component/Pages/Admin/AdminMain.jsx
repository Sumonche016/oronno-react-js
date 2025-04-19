import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { BiCartAdd } from "react-icons/bi";
import { BsDatabaseFillAdd } from 'react-icons/bs';
import { CgProductHunt } from "react-icons/cg";
import { FaUserCog } from "react-icons/fa";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { HiOutlineUsers } from "react-icons/hi";

const AdminMain = () => {
  const menus = [
    { name: "Dashboard", link: "", icon: MdOutlineDashboard, end: true },
    { name: "Add Product", link: "addProduct", icon: BsDatabaseFillAdd },
    { name: "Product List", link: "productList", icon: CgProductHunt },
    { name: "Orders", link: "orders", icon: BiCartAdd },
    { name: "All User", link: "users", icon: HiOutlineUsers },

    { name: "Make Admin", link: "make-admin", icon: FaUserCog },
    { name: "Add Banner", link: "add-banner", icon: TfiLayoutSliderAlt },
  ];

  // className={({ isActive }) => (isActive ? active : deactive)}
  const active = `group flex text-primary-text bg-primary-red items-center text-sm  flex gap-3 items-center font-medium p-2 text-white rounded-md`;
  const deActive = `group flex text-primary-text items-center text-sm  gap-3.5 font-medium p-2 rounded-md`;

  const [open, setOpen] = useState(false);
  return (
    <section className="flex">
      <div
        className={` min-h-screen bg-white  ${open ? "w-56" : "w-16"
          } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-primary-text"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <NavLink
              to={menu?.link}
              key={i}
              end={menu?.end}
              className={({ isActive }) => (isActive ? active : deActive)}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${open && "hidden"
                  } absolute left-48 bg-white !z-[10000] font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="p-8 text-xl text-gray-900 font-semibold w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default AdminMain;
