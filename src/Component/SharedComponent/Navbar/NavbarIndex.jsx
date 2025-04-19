import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { RiArrowRightSLine, RiHome2Line } from "react-icons/ri";
import { AiOutlineAlignLeft } from "react-icons/ai";
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { routeLink } from "../../../Routes/RoutesIndex";
import logoImage from "../../../assets/Images/logocrop-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllCartItem,
  selectSearchKeyword,
} from "../../../Redux/filter/selectFilter";
import SearchBox from "../SearchBox/SearchBox";
import { toast } from "react-toastify";
import { BsCartCheckFill, BsSearch } from "react-icons/bs";
import { addSearchKeyword } from "../../../Redux/filter/filterSlice";
import { getAuth, signOut } from "firebase/auth";
import app from "../../../firebase/firebase.init";
import { selectAccessToken } from "../../../Redux/auth/selectAuth";
import Cookies from "js-cookie";
import { adminLogout } from "../../../Redux/auth/authSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { navSwitch } from "../../../Redux/nav/navSlice";
import "./NavbarIndex.css";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
const Navbar = () => {
  const dispatch = useDispatch();
  const navOpen = useSelector((state) => state.nav.navOpen);
  const navOpenFn = () => {
    dispatch(navSwitch());
  };

  const [searchOpen, setsearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [currentUser, setCurrentUser] = useState(() => {
    const auth = getAuth(app);
    return auth.currentUser;
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const auth = getAuth(app);
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);

  const { pathname: encodedPath } = useLocation();
  const pathname = decodeURIComponent(encodedPath);
  const allCurtItem = useSelector(selectAllCartItem);
  const accessToken = useSelector(selectAccessToken);
  const navigate = useNavigate();
  const searchKeyword = useSelector(selectSearchKeyword);

  const showLogin = !location?.pathname.includes("admin");

  const [searchValue, setSearchValue] = useState(searchKeyword);
  const match = useMatch("/search-result");
  // authentication login
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
  const openLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  const executeSignOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        toast.success("Successful sign out");
      })
      .catch((error) => {
        console.error("Error occurred during sign out:", error);
      });
  };

  // search user function
  const handleSearch = (e) => {
    if (!searchValue) {
      return;
    }
    e.preventDefault();
    dispatch(addSearchKeyword(searchValue));
    if (!match) {
      navigate("/search-result");
    }
  };

  {
    allCurtItem?.length;
  }

  // logout function
  const logout = () => {
    dispatch(adminLogout());
    Cookies.remove("accessToken", { path: "/" });
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <nav className="backdrop-blur-3xl !pt-[6.5rem] md:py-3 py-2 bg-white">
      <div className="container mx-auto">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          {/* mobile navbar icons  */}
          <div className="md:hidden  justify-between items-center w-full hidden">
            <button
              onClick={navOpenFn}
              type="button"
              className="inline-flex items-center p-[5px] ml-3 text-2xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <GiHamburgerMenu />
            </button>

            <img
              onClick={() => navigate("/")}
              className="w-[140px] my-1.5"
              src={logoImage}
              alt="Logo image"
            />

            <button
              type="button"
              className="mr-2 inline-flex items-center p-[5px] ml-2 text-2xl text-gray-500 hover:text-primary-green rounded-lg md:hidden hover:bg-gray-100 relative group/card duration-100 ease-in-out"
            >
              <FaShoppingCart />
              <Link
                to="/cart"
                className="flex justify-center items-center p-1 bg-[#6bb42f]  text-white absolute top-0 right-0 border border-[#A1A1AA] text-[.6rem] rounded-full w-4 h-4 font-semibold"
              >
                {localStorage?.length}
              </Link>
            </button>
          </div>

          <div
            className={`${navOpen ? "block" : "hidden"}
              ${
                searchOpen ? "hidden" : "md:block"
              } transition-all duration-200 w-full hidden md:w-auto`}
          >
            <ul className="flex flex-col  font-medium p-4 md:p-0 mt-4 border border-primary rounded-md  md:flex-row md:gap-8 md:mt-0 md:border-0 md:bg-transparent">
              {routeLink?.map((route, key) => {
                return (
                  <li key={key}>
                    <NavLink to={route.children ? pathname : route.path}>
                      <button
                        onClick={() => {
                          dropdownOpen
                            ? setDropdownOpen("")
                            : setDropdownOpen(route.name);
                          !route?.children && dispatch(navSwitch(false));
                        }}
                        className={`flex items-center justify-between w-full py-2 pl-3 pr-4  md:hover:bg-transparent text-sm md:p-0 md:w-auto font-medium relative ${
                          pathname.includes(route.path)
                            ? "bg-primary-red md:bg-transparent text-white md:text-primary-text rounded-[10px]"
                            : "hover:text-primary-green hover:bg-gray-200 text-primary-text"
                        }`}
                      >
                        {route.name}{" "}
                        {route.children && (
                          <RiArrowRightSLine
                            className={`w-5 h-5 ml-1 md:rotate-90 ${
                              dropdownOpen === route.name && "rotate-90"
                            } duration-150 ease-in-out`}
                          />
                        )}
                      </button>
                    </NavLink>
                    {/* <!-- Dropdown menu --> */}
                    {route.children && (
                      <div
                        className={` ${
                          dropdownOpen === route.name
                            ? "block md:absolute"
                            : "hidden"
                        } z-10 font-medium bg-white md:divide-y divide-gray-100 rounded-lg shadow w-full md:w-44 pl-2 `}
                      >
                        <ul className="py-2 text-sm text-gray-700">
                          {route.children.map((route2, key) => {
                            return (
                              <li
                                key={key}
                                onClick={() => {
                                  setDropdownOpen(""),
                                    dispatch(navSwitch(false));
                                }}
                              >
                                <NavLink
                                  to={route.path + route2.path}
                                  className={`block px-4 py-2 font-medium ${
                                    pathname.includes(route.path + route2.path)
                                      ? "bg-primary-green md:bg-transparent text-white md:text-primary-green "
                                      : "hover:text-primary-green hover:bg-gray-100 text-primary-text"
                                  }`}
                                >
                                  {route2.name}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex md:w-auto w-[96%] mx-auto md:m-0 items-center justify-between">
            <AiOutlineAlignLeft
              onClick={navOpenFn}
              className="md:hidden text-[25px] cursor-pointer"
            />
            <div className="flex  items-center  md:gap-4 gap-2  ">
              <div className="">
                <SearchBox
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  handleSearch={handleSearch}
                  setsearchOpen={setsearchOpen}
                />
              </div>
              <div className="flex items-center gap-2">
                <div>
                  <button
                    onClick={handleSearch}
                    type="submit"
                    className={`bg-primary-red md:inline-block hidden  text-white px-2 md:px-4 py-2 text-[12px] md:text-[15px] rounded-md`}
                  >
                    Search Here
                  </button>

                  <button
                    onClick={handleSearch}
                    type="submit"
                    className={`bg-primary-red inline-block md:hidden  text-white px-2 md:px-4 py-2 text-[12px] md:text-[15px] rounded-md`}
                  >
                    Search
                  </button>
                </div>

                {/* {showLogin && (
                  <div className="cursor-pointer">
                    {user ? (
                      <h1
                        onClick={async () => {
                          await signOut();
                        }}
                        className="cursor-pointer"
                      >
                        Sign Out
                      </h1>
                    ) : (
                      <h1
                        onClick={() => navigate("/login")}
                        className="font-medium text-primary-text text-[14px] md:text-[1rem]"
                      >
                        Login
                      </h1>
                    )}
                  </div>
                )} */}

                {/* <div>
                  {accessToken && (
                    <button
                      onClick={logout}
                      type="button"
                      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium text-base rounded-lg px-4 py-2"
                    >
                      Logout
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          </div>

          {/* mobile menu   */}

          {isMobile && (
            <Drawer anchor="left" open={navOpen}>
              <div className="flex items-center justify-end p-2">
                <IconButton onClick={() => dispatch(navSwitch(false))}>
                  <CloseIcon />
                </IconButton>
              </div>
              <List
                component="nav"
                className="flex flex-col  p-4 md:p-0 mt-4 border-t  border-[#e8e8e8]  md:flex-row md:gap-8 md:mt-0 md:border-0 md:bg-transparent"
              >
                {routeLink?.map((route, key) => {
                  const isDropdownOpen = dropdownOpen === route.name;
                  return (
                    <li key={key}>
                      <NavLink to={route.children ? pathname : route.path}>
                        <ListItemButton
                          onClick={() => {
                            setDropdownOpen(isDropdownOpen ? "" : route.name);
                            !route?.children && dispatch(navSwitch(false));
                          }}
                          className={`flex  items-center justify-between w-full py-2 pl-3 pr-4 md:hover:bg-transparent text-sm md:p-0 md:w-auto font-medium relative ${
                            pathname.includes(route.path)
                              ? "bg-primary-red md:bg-transparent text-white md:text-primary-text rounded-[10px]"
                              : "hover:text-primary-green hover:bg-gray-200 text-primary-text"
                          }`}
                        >
                          <ListItemText primary={route.name} />
                          {route.children && (
                            <ListItemIcon>
                              <RiArrowRightSLine
                                className={`w-5 h-5 ml-1 md:rotate-90 ${
                                  isDropdownOpen ? "rotate-90" : ""
                                } duration-150 ease-in-out`}
                              />
                            </ListItemIcon>
                          )}
                        </ListItemButton>
                      </NavLink>
                      {/* Dropdown menu */}
                      {route.children && (
                        <div
                          className={` ${
                            isDropdownOpen ? "block md:absolute" : "hidden"
                          } z-10 font-medium bg-white md:divide-y divide-gray-100 text-[15px] shadow w-full md:w-44 pl-2 `}
                        >
                          <List>
                            {route.children.map((route2, key) => {
                              return (
                                <NavLink
                                  to={route.path + route2.path}
                                  key={key}
                                  className={`block text-[14px] px-2 font-medium ${
                                    pathname.includes(route.path + route2.path)
                                      ? "bg-primary-green md:bg-transparent text-white md:text-primary-green "
                                      : "hover:text-primary-green hover:bg-gray-100 text-primary-text"
                                  }`}
                                >
                                  <ListItemText primary={route2.name} />
                                </NavLink>
                              );
                            })}
                          </List>
                        </div>
                      )}
                    </li>
                  );
                })}
              </List>
            </Drawer>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
