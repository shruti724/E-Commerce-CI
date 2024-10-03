import React from "react";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

// const isAdmin = false; 


const Footer = () => {
   
  const userRole = localStorage.getItem("role"); 
  const isAdmin = userRole === "admin";
  console.log("admin: ", isAdmin)
  console.log("user: ", userRole);
  return (
    <footer className="bd-footer py-2 bg-light fixed-bottom border-top">
      <div className="container">
        <div className="row text-center">
          {/* Conditional rendering for Admin */}
          {isAdmin ? (
            <>
              {/* Admin Dashboard Icon */}
              <div className="col">
                <Link to="/" className="text-decoration-none text-dark">
                  <i className="fas fa-tachometer-alt fa-lg"></i>
                  <p className="mb-0 small">Dashboard</p>
                </Link>
              </div>

              {/* Orders Icon */}
              <div className="col">
                <Link
                  to="/orderstable"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-box fa-lg"></i>
                  <p className="mb-0 small">Orders</p>
                </Link>
              </div>

              {/* Products Icon */}
              <div className="col">
                <Link
                  to="/productlist"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-boxes fa-lg"></i>
                  <p className="mb-0 small">Products</p>
                </Link>
              </div>

              {/* Users Icon */}
              <div className="col">
                <Link
                  to="/userslist"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-users fa-lg"></i>
                  <p className="mb-0 small">Users</p>
                </Link>
              </div>

              {/* Profile Icon */}
              <div className="col">
                <Link
                  to="/myProfileForm"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-user-cog fa-lg"></i>
                  <p className="mb-0 small">Profile</p>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Home Icon */}
              <div className="col">
                <Link
                  to="/landingpage"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-home fa-lg"></i>
                  <p className="mb-0 small">Home</p>
                </Link>
              </div>

              {/* Category Icon */}
              <div className="col">
                <Link
                  to="/categoryuserlist"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-th-large fa-lg"></i>
                  <p className="mb-0 small">Category</p>
                </Link>
              </div>

              {/* Explore Icon */}
              <div className="col">
                <Link to="/explore" className="text-decoration-none text-dark">
                  <i className="fas fa-search fa-lg"></i>
                  <p className="mb-0 small">Explore</p>
                </Link>
              </div>

              {/* Cart Icon */}
              <div className="col">
                <Link
                  to="/cartuserlist"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-shopping-cart fa-lg"></i>
                  <p className="mb-0 small">Cart</p>
                </Link>
              </div>

              {/* Profile Icon */}
              <div className="col">
                <Link
                  to="/myProfileForm"
                  className="text-decoration-none text-dark"
                >
                  <i className="fas fa-user fa-lg"></i>
                  <p className="mb-0 small">Profile</p>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
