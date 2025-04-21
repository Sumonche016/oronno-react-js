import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomeIndex from "./Component/Pages/Home/HomeIndex";
import Cart from "./Component/Pages/Cart/Cart";
import ProductPage from "./Component/SharedComponent/ProductPage/ProductPageIndex";
// nursery routes
import Folgach from "./Component/Pages/Nursery/Folgach.jsx";
import "./Component/Pages/Nursery/NurseryIndex.css";
import Checkout from "./Component/Pages/Checkout/CheckoutIndex";
import SovamoyGach from "./Component/Pages/Nursery/SovamoyGach";
import FulGach from "./Component/Pages/Nursery/FulGach";
import Bonshai from "./Component/Pages/Nursery/Bonshai";
import Kaktas from "./Component/Pages/Nursery/Kaktas";
import OnnannoOutlet from "./Component/Pages/Other/OnnannoOutlet";
import GardeningPackage from "./Component/Pages/Other/GardeningPackage";
import AdminHome from "./Component/Pages/Admin/AdminHome";
import AdminMain from "./Component/Pages/Admin/AdminMain";
import AddProduct from "./Component/Pages/Admin/AddProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./Component/Pages/Admin/ProductList";
import MoslaJatiyoGach from "./Component/Pages/Nursery/MoslaJatiyoGach";
import GardeningTools from "./Component/Pages/Other/GardeningTools";
import GardeningService from "./Component/Pages/Other/GardeningService";
import Register from "./Component/Pages/Register/Register";
import Login from "./Component/Pages/Login/Login";
import BaganOnusasngikIndex from "./Component/Pages/Other/BaganOnusasngikIndex";
import MailVerify from "./Component/Pages/MailVerify/MailVerify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { adminLogin } from "./Redux/auth/authSlice";
import AuthGuard from "./Component/SharedComponent/AuthGuard/AuthGuard";
import ResetPassword from "./Component/Pages/ResetPassword/ResetPassword";
import EditProduct from "./Component/Pages/Admin/EditProduct";
import SearchResult from "./Component/Pages/SearchResult/SearchResult";
import { initializeCart } from "./Redux/filter/filterSlice";
import Orders from "./Component/Pages/Admin/Orders/Orders";
import OrderStatusIndex from "./Component/Pages/OrderStatus/OrderStatusIndex";
import MakeAdmin from "./Component/Pages/Admin/MakeAdmin/MakeAdmin";
import Banner from "./Component/Pages/Admin/Banner/Banner";
import Chat from "./Component/SharedComponent/Chat/Chat";
import UserLogin from "./Component/Pages/Login/UserLogin";
import loadingImage from "./assets/Images/loading.gif";
import NavBarChange from "./Component/SharedComponent/Navbar/NavBarChange";
import OrderDetails from "./Component/Pages/Admin/OrderDetails";

import { useGetAllBannerQuery } from "./Redux/banner/bannerApi";
import TermsIndex from "./Component/Pages/TermsAndCondition/TermsIndex";
import AboutIndex from "./Component/Pages/AboutUs/AboutIndex";
import RelentedProductLoading from "./loading/RelentedProductLoading";
import AllUser from "./Component/Pages/Admin/User/AllUser";
import NewLoading from "./loading/NewLoading.jsx";
import Pakage from "./Component/Pages/Home/Pakage.jsx";
import IndoorPlantPackage from "./Component/Pages/Home/IndoorPlantPackage";
import FruitTreePackage from "./Component/Pages/Home/FruitTreePackage";

function App() {
  const location = useLocation();
  const showFooter = !location?.pathname.includes("admin");
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");

  // initialize local storage with redux
  const allCurtItem = JSON?.parse(localStorage?.getItem("products"));
  const totalPrice = allCurtItem?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.totalPrice;
  }, 0);
  if (allCurtItem) {
    dispatch(initializeCart({ cart: allCurtItem, totalPrice }));
  }

  // checking access token existence and set redux store
  useEffect(() => {
    if (accessToken) {
      dispatch(adminLogin({ accessToken }));
    }
  }, [accessToken, dispatch]);

  const { data, isLoading, isError } = useGetAllBannerQuery();

  if (isError) {
    return <div>Something went wrong</div>;
  }

  // if (isLoading) {
  //   return (
  //     <NewLoading/>
  //   );
  // }
  return (
    <div className="App bg-[#f3f6f9]">
      <NavBarChange />

      <Routes>
        <Route path="/loading" element={<RelentedProductLoading />} />
        <Route path="/" element={<HomeIndex />} />
        <Route path="/indorplant-pakage" element={<IndoorPlantPackage />} />
        <Route path="/folgach-pakage" element={<FruitTreePackage />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/login" element={<UserLogin />} />
        {/* <Route path="/signUp" element={<UserSignUp />} /> */}
        <Route path="/terms-condition" element={<TermsIndex />} />
        <Route path="/about-us" element={<AboutIndex />} />
        <Route path="/হোম" element={<HomeIndex />} />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AdminMain />
            </AuthGuard>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="productList" element={<ProductList />} />
          <Route path="add-banner" element={<Banner />} />
          <Route path="users" element={<AllUser />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="make-admin" element={<MakeAdmin />} />
          <Route path="editProduct/:productId" element={<EditProduct />} />
        </Route>

        <Route path="/ফল-গাছ" element={<Folgach category={"ফল গাছ"} />} />
        <Route
          path="/শোভাময়-গাছ"
          element={<SovamoyGach category={"শোভাময় গাছ"} />}
        />
        <Route path="/ফুল-গাছ" element={<FulGach category={"ফুল গাছ"} />} />
        <Route path="/বনসাই" element={<Bonshai category={"বনসাই"} />} />
        <Route path="/ক্যাকটাস" element={<Kaktas category={"ক্যাকটাস"} />} />
        {/* <Route path="/গার্ডেনিং-প্যাকেজ" element={<GardeningPackage />} /> */}

        <Route path="/অন্নান্য" element={<OnnannoOutlet />}>
          <Route
            path="মশলা-জাতীয়-গাছ"
            element={<MoslaJatiyoGach category={"মশলা জাতীয় গাছ"} />}
          />
          <Route
            path="সবজি-জাতীয়-গাছ"
            element={<MoslaJatiyoGach category={"সবজি জাতীয় গাছ"} />}
          />
          <Route path="গার্ডেনিং-টুলস" element={<GardeningTools />} />
          <Route path="গার্ডেনিং-সার্ভিস" element={<GardeningService />} />
          <Route path="গার্ডেনিং-প্যাকেজ" element={<GardeningPackage />} />
          <Route path="বাগান-আনুষাঙ্গিক" element={<BaganOnusasngikIndex />} />
        </Route>

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderStatus" element={<OrderStatusIndex />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* admin login */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/verify/:hash" element={<MailVerify />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
      </Routes>

      {/* add facebook page customer chat  */}
      {/* <CustomerChat /> */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
        pauseOnHover={false}
        closeOnClick={false}
      />
      <Chat />
    </div>
  );
}

export default App;
