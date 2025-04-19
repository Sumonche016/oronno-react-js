import React from "react";
import { Link } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import UseFindWindowSize from "../../../../hooks/UseFindWindowSize";
import { sideNavRoutes } from "../../../../Routes/RoutesIndex";

const SideNav = () => {
  const windowWidth = UseFindWindowSize();

  return (
    <div
      className={`w-[15rem] mr-3 shrink-0 rounded-[10px] bg-primary-white ${windowWidth > 975 ? "block" : "hidden"
        }`}
    >
      <ul className="w-full relative duration-200 ease-out">
        {sideNavRoutes.map((route, key) => (
          <Link key={key} to={route.path} className="group/link">
            <div className="flex justify-between items-center text-sm px-5 py-3 border-b border-primary font-medium hover:bg-primary-gray duration-100 ease-out cursor-pointer">
              <li>{route.name}</li>
              {route.children && (
                <span className="text-xl text-[#909090]">
                  <RiArrowRightSLine />
                </span>
              )}
            </div>

            {route.children && (
              <div className="absolute duration-100 ease-out hidden group-hover/link:block group-hover/link:left-[208px] z-10 w-52  rounded-r-md">
                <ul className="relative -top-11 bg-primary-white rounded-r-md">
                  {route.children.map((childrenRoute, key) => (
                    <Link key={key} to={route.path + childrenRoute.path}>
                      <li className="text-sm pr-3 pl-5 py-3 border-b border-primary font-medium hover:bg-primary-gray duration-100 ease-out cursor-pointer">
                        {childrenRoute.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
