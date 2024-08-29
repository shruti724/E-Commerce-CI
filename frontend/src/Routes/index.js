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
import Child from "../pages/Child";
import Xyz from "../pages/Xyz";
import OrdersTable from "../pages/orders/OrdersTable";
import ProductsList from "../pages/products/ProductsList";
import UsersList from "../pages/users/UsersList";
import AddProduct from "../pages/products/AddProduct";
import CategoriesList from "../pages/categories/CategoriesList";
import AddCategory from "../pages/categories/AddCategory";
import BrandsList from "../pages/brands/BrandsList";
import AddBrand from "../pages/brands/AddBrand"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Public routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="child" element={<Child />} />
      <Route path="xyz" element={<Xyz />} />
      <Route path="orderstable" element={<OrdersTable />} />
      <Route path="productlist" element={<ProductsList />} />
      <Route path="userslist" element={<UsersList />} />
      <Route path="addproduct" element={<AddProduct />} />
      <Route path="categorieslist" element={<CategoriesList />} />
      <Route path="addcategory" element={<AddCategory />} />
      <Route path="addbrand" element={<AddBrand />} />
      <Route path="brandslist" element={<BrandsList />} />
      
      {/* Protected routes */}
      <Route element={<Protected />}>
        <Route index element={<Dashboard />} />
        <Route path="myProfileForm" element={<MyProfileForm />} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
};

export default Index;
