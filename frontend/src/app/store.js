import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config";
import todoReducer from "../features/todo/todoSlice";
import productReducer from "../features/product/productSlice";
import searchReducer from "../features/search/searchSlice";
import authenticationReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import reviewReducer from "../features/review/reviewSlice";
import userReducer from "../features/user/userSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import couponUserReducer from "../features/userfeatures/coupon/couponUserSlice"; 
import productUserReducer from "../features/userfeatures/product/productUserSlice";
import cartUserReducer from "../features/userfeatures/cart/cartUserSilce"
import orderUserReducer from "../features/userfeatures/order/orderUserSlice"
import categoryUserReducer from "../features/userfeatures/category/categoryUserSlice";
import couponReducer from "../features/coupon/couponSlice"

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token retrieved:", token); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const store = configureStore({
  reducer: {
    todo: todoReducer,
    product: productReducer,
    search: searchReducer,
    user: userReducer,
    auth: authenticationReducer,
    category: categoryReducer,
    brand: brandReducer,
    review: reviewReducer,
    wishlist: wishlistReducer,
    couponUser: couponUserReducer,
    productUser: productUserReducer,
    cartUser: cartUserReducer,
    orderUser: orderUserReducer,
    categoryUser: categoryUserReducer,
    coupons: couponReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
