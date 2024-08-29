import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import productReducer from "../features/product/productSlice"; 
import searchReducer from "../features/search/searchSlice";
import authenticationReducer from "../features/auth/authSlice"
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    product: productReducer, 
    search: searchReducer,
    auth: authenticationReducer,
    category: categoryReducer,
    brand: brandReducer
  },
});
