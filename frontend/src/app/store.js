import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import productReducer from "../features/product/productSlice";
import searchReducer from "../features/search/searchSlice";
import authenticationReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import reviewReducer from "../features/review/reviewSlice";
import userReducer from "../features/user/userSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import couponReducer from "../features/userfeatures/coupon/couponUserSlice"; 
import productUserReducer from "../features/userfeatures/product/productUserSlice";
import cartUserReducer from "../features/userfeatures/cart/cartUserSilce"
import orderUserReducer from "../features/userfeatures/order/orderUserSlice"
import categoryUserReducer from "../features/userfeatures/category/categoryUserSlice";

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
    coupon: couponReducer,
    productUser: productUserReducer,
    cartUser: cartUserReducer,
    orderUser: orderUserReducer,
    categoryUser: categoryUserReducer,
  },
});
