// import Login from "./pages/Login";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import OrdersTable from "./pages/OrdersTable";
// import MyProfileForm from "./pages/MyProfileForm";

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route exact path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route pa247th="/dashboard" element={<Dashboard />} />
//           <Route path="/ordersTable" element={<OrdersTable />} />
//           <Route path="/myProfileForm" element={<MyProfileForm />} />
//           <Route path="/" />
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

import AddTodo from "./Components/AddTodo";
import ProductsList from "./pages/products/ProductsList";
import Todos from "./Components/Todos";
import Routes from "./Routes/index";

export default function App() {
  return (
    <>
      <Routes />
      {/* <AddTodo/>
    <Todos/> */}
      {/* <ProductsList /> */}
    </>
  );
}
