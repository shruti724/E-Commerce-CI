import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  fetchSearchResults,
  clearSearch,
} from "../../features/search/searchSlice";
import './SideAndSearchbar.css'; 
import axios from "axios";
// import { logout } from "../../features/auth/authSlice";

const SideAndSearchbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const [inputValue, setInputValue] = useState(query);
  const isAdmin = localStorage.getItem("role") === "admin";
  const isUser = localStorage.getItem("role") === "user";
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      // Retrieve the token from localStorage or wherever you store it
      const token = localStorage.getItem("token");

      // Send a POST request to the logout endpoint with the token
      await axios.post(
        "/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear the token and redirect the user to the login page
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleDrawer}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Link className="navbar-brand" to="/">
          <img
            src="../assets/images/logo-image-light.png"
            alt="Logo"
            className="logo "
          />
        </Link>

        {/* Icons in a single line */}
        {isUser && (
          <>
            <div className="d-flex align-items-center">
              {/* Search Icon */}
              <button className="btn mx-2 p-0">
                <i className="fas fa-search"></i>
              </button>

              {/* Profile Icon */}
              <Link to="/myProfileForm" className="btn mx-2 p-0">
                <i className="fas fa-user"></i>
              </Link>

              {/* Cart Icon */}
              <Link to="/cartuserlist" className="btn p-0 position-relative">
                <i className="fas fa-shopping-cart"></i>
                <span
                  className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  0
                </span>
              </Link>
            </div>
          </>
        )}
        {isAdmin && (
          <>
            <div className="d-flex align-items-center">
              {/* Search Icon */}
              <button className="btn mx-2 p-0">
                <i className="fas fa-search"></i>
              </button>

              <Link
                to="/notifications"
                className="btn mx-2 p-0 position-relative"
              >
                <i className="fas fa-bell"></i>
                <span
                  className="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  3 {/* Replace with dynamic count */}
                </span>
              </Link>

              {/* Payment Icon */}
              <Link to="/payments" className="btn mx-2 p-0">
                <i className="fas fa-credit-card"></i>
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={toggleDrawer}
      ></div>

      {/* Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <ul className="navbar-nav">
          {/* Common navigation items */}
          {isUser && (
            <>
              <main>
                <div>
                  <li className="nav-item border-bottom ">
                    <Link className="nav-link me-4" to="/landingpage">
                      <i className="fas fa-home mx-2"></i>
                      Home
                    </Link>
                  </li>
                  
                  <li className="nav-item border-bottom">
                    <Link className="nav-link me-4" to="/orderuserlist">
                      <i className="fas fa-box-open mx-2"></i>
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item border-bottom">
                    <Link className="nav-link me-4" to="/wishlist">
                      <i className="fas fa-heart mx-2"></i>
                      Wishlist
                    </Link>
                  </li>
                  <li className="nav-item border-bottom">
                    <Link className="nav-link me-4" to="/couponuserlist">
                      <i className="fas fa-box mx-2"></i>
                      Coupons
                    </Link>
                  </li>
                  <li className="nav-item border-bottom">
                    <Link className="nav-link me-4" to="/orderuserlist">
                      <i className="fas fa-cog mx-2"></i>
                      Settings
                    </Link>
                  </li>
                  <li className="nav-item border-bottom">
                    <Link className="nav-link me-4" to="/myProfileForm">
                      <i className="fas fa-user mx-2"></i>
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    {!isAuthenticated ? (
                      <Link className="nav-link" to="/login">
                        <i className="fas fa-sign-out-alt mx-2 "></i>
                        Logout
                      </Link>
                    ) : (
                      <a className="nav-link" href="#" onClick={handleLogout}>
                        <i className="fas fa-sign-in-alt mx-2  "></i>
                        Login
                      </a>
                    )}
                  </li>
                </div>
              </main>
            </>
          )}
          {/* Admin-specific navigation items */}
          {isAdmin && (
            <>
              <main>
                <div
                  className="nav-scroll-container"
                  style={{ maxHeight: "600px", overflowY: "auto" }}
                >
                  <ul className="nav flex-column">
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/">
                        <i className="fas fa-tachometer-alt mx-2"></i>
                        Dashobard
                      </Link>
                    </li>

                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/ordersTable">
                        <i className="fas fa-box-open mx-2"></i>
                        Orders
                      </Link>
                    </li>

                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/productlist">
                        <i className="fas fa-boxes mx-2"></i>
                        Products
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addproduct">
                        <i className="fas fa-plus-square mx-2"></i>
                        Add Product
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/brandslist">
                        <i className="fas fa-tags mx-2"></i>
                        Brands
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addbrand">
                        <i className="fas fa-plus-circle mx-2"></i>
                        Add Brand
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/categorieslist">
                        <i className="fas fa-th-list mx-2"></i>
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addcategory">
                        <i className="fas fa-plus mx-2"></i>
                        Add Category
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/userslist">
                        <i className="fas fa-users mx-2"></i>
                        Users
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/adduser">
                        <i className="fas fa-user-plus mx-2"></i>
                        Add User
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/couponslist">
                        <i className="fas fa-box mx-2"></i>
                        Coupons
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addcoupon">
                        <i className="fas fa-ticket-alt mx-2"></i>
                        Add Coupons
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/review">
                        <i className="fas fa-star mx-2"></i>
                        Reviews
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addReview">
                        <i className="fas fa-pen mx-2"></i>
                        Add Review
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addReview">
                        <i className="fas fa-credit-card mx-2"></i>
                        Payment
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addReview">
                        <i className="fas fa-cog mx-2"></i>
                        Settings
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <a className="nav-link" href="#" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt mx-2"></i>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </main>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideAndSearchbar;
