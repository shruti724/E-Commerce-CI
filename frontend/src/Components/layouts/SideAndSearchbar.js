import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  fetchSearchResults,
  clearSearch,
} from "../../features/search/searchSlice";
import './SideAndSearchbar.css'; // Ensure you import your CSS file

const SideAndSearchbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const [inputValue, setInputValue] = useState(query);
  const isAdmin = useSelector((state) => state.user?.profile?.role === "admin");
  const isUser = useSelector((state) => state.user?.profile?.role === "user");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    // Your logout logic
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
                    <Link className="nav-link me-4" to="/productuserlist">
                      <i className="fas fa-home mx-2"></i>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item border-bottom">
                    <Link className="nav-link me-4" to="/categoryuserlist">
                      <i className="fas fa-tag mx-2"></i>
                      Category
                    </Link>
                  </li>
                  <li className="nav-item border-bottom">
                    <Link className="nav-link me-4" to="/orderuserlist">
                      <i className="fas fa-box mx-2"></i>
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
                    <Link className="nav-link me-4" to="/myProfileForm">
                      <i className="fas fa-user mx-2"></i>
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item border-bottom">
                    <a className="nav-link " href="#" onClick={handleLogout}>
                      <i className="fas fa-user mx-2"></i>
                      Logout
                    </a>
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
                      <Link className="nav-link" to="/ordersTable">
                        <i className="fas fa-box mx-2"></i>
                        Home
                      </Link>
                    </li>

                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/ordersTable">
                        <i className="fas fa-box mx-2"></i>
                        Orders
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addOrder">
                        <i className="fas fa-box mx-2"></i>
                        Add Order
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/products">
                        <i className="fas fa-box mx-2"></i>
                        Products
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addProduct">
                        <i className="fas fa-box mx-2"></i>
                        Add Product
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/brands">
                        <i className="fas fa-box mx-2"></i>
                        Brands
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addBrand">
                        <i className="fas fa-box mx-2"></i>
                        Add Brand
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/categories">
                        <i className="fas fa-box mx-2"></i>
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addCategory">
                        <i className="fas fa-box mx-2"></i>
                        Add Category
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/users">
                        <i className="fas fa-box mx-2"></i>
                        Users
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addUser">
                        <i className="fas fa-box mx-2"></i>
                        Add User
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/coupons">
                        <i className="fas fa-box mx-2"></i>
                        Coupons
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addCoupons">
                        <i className="fas fa-box mx-2"></i>
                        Add Coupons
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/reviews">
                        <i className="fas fa-box mx-2"></i>
                        Reviews
                      </Link>
                    </li>
                    <li className="nav-item border-bottom">
                      <Link className="nav-link" to="/addReview">
                        <i className="fas fa-box mx-2"></i>
                        Add Review
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <a className="nav-link" href="#" onClick={handleLogout}>
                        <i className="fas fa-box mx-2"></i>
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
