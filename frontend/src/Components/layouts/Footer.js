import React from "react";
import { Link } from "react-router-dom";
// import "./Footer.css"; // Optional: If you want to apply custom styles

const Footer = () => {
  return (
    <footer className="bd-footer py-2 bg-light fixed-bottom border-top">
      <div className="container">
        <div className="row text-center">
          {/* Home Icon */}
          <div className="col">
            <Link to="/productlist" className="text-decoration-none text-dark">
              <i className="fas fa-home fa-lg"></i>
              <p className="mb-0 small">Home</p>
            </Link>
          </div>

          {/* Category Icon */}
          <div className="col">
            <Link to="/categoryuserlist" className="text-decoration-none text-dark">
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
            <Link to="/cartuserlist" className="text-decoration-none text-dark">
              <i className="fas fa-shopping-cart fa-lg"></i>
              <p className="mb-0 small">Cart</p>
            </Link>
          </div>

          {/* Profile Icon */}
          <div className="col">
            <Link to="/myProfileForm" className="text-decoration-none text-dark">
              <i className="fas fa-user fa-lg"></i>
              <p className="mb-0 small">Profile</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
