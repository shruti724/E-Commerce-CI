import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../features/user/userSlice";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Protected from "./protected";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyProfileForm from "../pages/MyProfileForm";
import OrdersTable from "../pages/orders/OrdersTable";
import ProductsList from "../pages/products/ProductsList";
import UsersList from "../pages/users/UsersList";
import AddUser from "../pages/users/AddUser";
import AddProduct from "../pages/products/AddProduct";
import CategoriesList from "../pages/categories/CategoriesList";
import AddCategory from "../pages/categories/AddCategory";
import BrandsList from "../pages/brands/BrandsList";
import AddBrand from "../pages/brands/AddBrand";
import ResetPassword from "../pages/resetpassword/ResetPassword";
import NewPassword from "../pages/resetpassword/NewPassword";
import Review from "../pages/reviews/ReviewsLists";
import AddReview from "../pages/reviews/AddReview";
import WishList from "../pages/userpages/wishlist/Wishlist";
import ProductUserLists from "../pages/userpages/products/ProductUserLists";
import CouponUserList from "../pages/userpages/coupons/CouponUserLists";
import CartUserList from "../pages/userpages/carts/CartUserLists";
import OrderUserList from "../pages/userpages/orders/OrderUserLists";
import CategoryUserLists from "../pages/userpages/categories/CategoryUserLists";
import ProductDetailUser from "../pages/userpages/products/ProductDetailUser";
import CouponsList from "../pages/coupons/CouponsList";
import AddCoupon from "../pages/coupons/AddCoupon";
import LandingPage from "../Components/LandingPage";

const RoutesWithLogging = () => {
  // const dispatch = useDispatch();
  // const { profile } = useSelector((state) => state.user);
  // const [role, setRole] = useState(null);

  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (profile) {
  //     console.log("profile: ", profile);
  //     setRole(profile.role);    
  //   }
  // }, [profile]);

  const userRole = localStorage.getItem("role");
  const userToken = localStorage.getItem("token")
  const isAdmin = userRole === "admin";
  console.log("admin", isAdmin)
console.log("user token: ",userToken)
  const isAuthenticated = !!userToken;
  console.log("isAuthenticated", isAuthenticated);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Conditionally render routes based on role */}
        {isAuthenticated && isAdmin && (
          <>
            <Route path="orderstable" element={<OrdersTable />} />
            <Route path="productlist" element={<ProductsList />} />
            <Route path="userslist" element={<UsersList />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="categorieslist" element={<CategoriesList />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="addbrand" element={<AddBrand />} />
            <Route path="brandslist" element={<BrandsList />} />
            <Route path="review" element={<Review />} />
            <Route path="addreview" element={<AddReview />} />
            <Route path="couponslist" element={<CouponsList />} />
            <Route path="addcoupon" element={<AddCoupon />} />
          </>
        )}
        {isAuthenticated && !isAdmin && (
          <>
            <Route path="productuserlist" element={<ProductUserLists />} />
            <Route path="wishlist" element={<WishList />} />
            <Route path="couponuserlist" element={<CouponUserList />} />
            <Route path="cartuserlist" element={<CartUserList />} />
            <Route path="orderuserlist" element={<OrderUserList />} />
            <Route path="categoryuserlist" element={<CategoryUserLists />} />
            <Route path="productdetailuser" element={<ProductDetailUser />} />
          </>
        )}

        {/* Protected routes */}
        {
          <Route element={<Protected />}>
            <Route
              index
              element={
                isAdmin ? <Dashboard /> : <LandingPage />
              }
            />

            <Route path="myProfileForm" element={<MyProfileForm />} />
          </Route>
        }
        <Route path="landingpage" element={<LandingPage />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="/reset/:token" element={<NewPassword />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<h1>Not Authenticated.</h1>} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};


const Index = () => {
  return <RoutesWithLogging />;
};

export default Index;
