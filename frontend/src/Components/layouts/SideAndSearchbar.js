import { React, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  fetchSearchResults,
  clearSearch,
} from "../../features/search/searchSlice";

const SideAndSearchbar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const [inputValue, setInputValue] = useState(query);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    dispatch(setQuery(e.target.value));
  };

  const handleSearch = async () => {
    if (inputValue.trim()) {
      try {
        await dispatch(fetchSearchResults(inputValue)).unwrap();
      } catch (error) {
        console.error("Error dispatching search results:", error);
      }
    }
  };

  const handleClearSearch = () => {
    setInputValue("");
    dispatch(clearSearch());
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <>
      {/* [ Pre-loader ] start */}
      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill" />
        </div>
      </div>
      {/* [ Pre-loader ] End */}
      {/* [ navigation menu ] start */}
      <nav className="pcoded-navbar menupos-fixed menu-light brand-blue ">
        <div className="navbar-wrapper ">
          <div className="navbar-brand header-logo">
            <a href="index.html" className="b-brand">
              <img
                src="../assets/images/logo.svg"
                alt=""
                className="logo images"
              />
              <img
                src="../assets/images/logo-icon.svg"
                alt=""
                className="logo-thumb images"
              />
            </a>
            <a className="mobile-menu" id="mobile-collapse" href="#!">
              <span />
            </a>
          </div>
          <div
            className="navbar-content scroll-div"
            style={{
              maxHeight: "80vh", // Adjust this height based on your layout
              overflowY: "auto", // Enables vertical scrolling
              overflowX: "hidden", // Prevents horizontal scrolling if content fits
            }}
          >
            <ul className="nav pcoded-inner-navbar">
              <li className="nav-item pcoded-menu-caption">
                <label>Navigation</label>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-grid" />
                  </span>
                  <span className="pcoded-mtext">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ordersTable" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-shopping-cart" />
                  </span>
                  <span className="pcoded-mtext">Orders</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/productlist" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-box" />
                  </span>
                  <span className="pcoded-mtext">Products</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addproduct" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-plus-square" />
                  </span>
                  <span className="pcoded-mtext">Add Products</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/brandslist" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-tag" />
                  </span>
                  <span className="pcoded-mtext">Brands</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addbrand" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-plus" />
                  </span>
                  <span className="pcoded-mtext">Add Brands</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/categorieslist" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-list" />{" "}
                  </span>
                  <span className="pcoded-mtext">Categories</span>
                  <span className="dropdown-icon">
                    <i className="feather icon-chevron-down" />
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/addcategory" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-plus" />
                  </span>
                  <span className="pcoded-mtext">Add Category</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/userslist" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-user" />
                  </span>
                  <span className="pcoded-mtext">Users</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-user-plus" />
                  </span>
                  <span className="pcoded-mtext">Add User</span>
                </Link>
              </li>
              <li className="nav-item">
                <a href="index.html" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-star" />
                  </span>
                  <span className="pcoded-mtext">Reviews</span>
                </a>
              </li>
              <li className="nav-item">
                <Link to="/myProfileForm" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-user-check" />
                  </span>
                  <span className="pcoded-mtext">My Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={handleLogout}>
                  <span className="pcoded-micon">
                    <i className="feather icon-log-out" />
                  </span>
                  <span className="pcoded-mtext">Logout</span>
                </a>
              </li>
              <li className="nav-item pcoded-hasmenu">
                <a href="#!" className="nav-link">
                  <span className="pcoded-micon">
                    <i className="feather icon-lock" />
                  </span>
                  <span className="pcoded-mtext">Authentication</span>
                </a>
              </li>
            </ul>
            <div className="card text-center">
              <div className="card-block">
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-hidden="true"
                >
                  ×
                </button>
                <i className="feather icon-sunset f-40" />
                <h6 className="mt-3">Upgrade to pro</h6>
                <p>upgrade for get full themes and 30min support</p>
                <a
                  href="https://codedthemes.com/item/flash-able-bootstrap-admin-template/"
                  target="_blank"
                  className="btn btn-gradient-primary btn-sm text-white m-0"
                >
                  Upgrade
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* [ navigation menu ] end */}
      {/* [ Header ] start */}
      <header className="navbar pcoded-header navbar-expand-lg navbar-light headerpos-fixed">
        <div className="m-header">
          <a className="mobile-menu" id="mobile-collapse1" href="#!">
            <span />
          </a>
          <a href="index.html" className="b-brand">
            <img
              src="../assets/images/logo.svg"
              alt=""
              className="logo images"
            />
            <img
              src="../assets/images/logo-icon.svg"
              alt=""
              className="logo-thumb images"
            />
          </a>
        </div>
        <a className="mobile-menu" id="mobile-header" href="#!">
          <i className="feather icon-more-horizontal" />
        </a>
        <div className="collapse navbar-collapse">
          <a href="#!" className="mob-toggler" />
          <ul className="navbar-nav mr-auto">
            {/* -----------------------------------Search bar-------------------------------------- */}
            <li className="nav-item">
              <div className="main-search open">
                <div className="input-group">
                  <input
                    type="text"
                    id="m-search"
                    className="form-control"
                    placeholder="Search . . ."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <a
                    href="#!"
                    className="input-group-append search-close"
                    onClick={handleClearSearch}
                  >
                    <i className="feather icon-x input-group-text" />
                  </a>
                  <span
                    className="input-group-append search-btn btn btn-primary"
                    onClick={handleSearch}
                  >
                    <i className="feather icon-search input-group-text" />
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li>
              <div className="dropdown">
                <a className="dropdown-toggle" href="#" data-toggle="dropdown">
                  <i className="icon feather icon-bell" />
                </a>
                <div className="dropdown-menu dropdown-menu-right notification">
                  <div className="noti-head">
                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                    <div className="float-right">
                      <a href="#!" className="m-r-10">
                        mark as read
                      </a>
                      <a href="#!">clear all</a>
                    </div>
                  </div>
                  <ul className="noti-body">
                    <li className="n-title">
                      <p className="m-b-0">NEW</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="../assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>John Doe</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />5
                              min
                            </span>
                          </p>
                          <p>New ticket Added</p>
                        </div>
                      </div>
                    </li>
                    <li className="n-title">
                      <p className="m-b-0">EARLIER</p>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="../assets/images/user/avatar-2.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />
                              10 min
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="../assets/images/user/avatar-3.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Sara Soudein</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />
                              12 min
                            </span>
                          </p>
                          <p>currently login</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="../assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />
                              30 min
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="../assets/images/user/avatar-3.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Sara Soudein</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />1
                              hour
                            </span>
                          </p>
                          <p>currently login</p>
                        </div>
                      </div>
                    </li>
                    <li className="notification">
                      <div className="media">
                        <img
                          className="img-radius"
                          src="../assets/images/user/avatar-1.jpg"
                          alt="Generic placeholder image"
                        />
                        <div className="media-body">
                          <p>
                            <strong>Joseph William</strong>
                            <span className="n-time text-muted">
                              <i className="icon feather icon-clock m-r-10" />2
                              hour
                            </span>
                          </p>
                          <p>Prchace New Theme and make payment</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="noti-footer">
                    <a href="#!">show all</a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="dropdown drp-user">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="icon feather icon-settings" />
                </a>
                <div className="dropdown-menu dropdown-menu-right profile-notification">
                  <div className="pro-head">
                    <img
                      src="../assets/images/user/avatar-1.jpg"
                      className="img-radius"
                      alt="User-Profile-Image"
                    />
                    <span>John Doe</span>
                    <a
                      href="auth-signin.html"
                      className="dud-logout"
                      title="Logout"
                    >
                      <i className="feather icon-log-out" />
                    </a>
                  </div>
                  <ul className="pro-body">
                    <li>
                      <a href="#!" className="dropdown-item">
                        <i className="feather icon-settings" /> Settings
                      </a>
                    </li>
                    <li>
                      <a href="#!" className="dropdown-item">
                        <i className="feather icon-user" /> Profile
                      </a>
                    </li>
                    <li>
                      <a href="message.html" className="dropdown-item">
                        <i className="feather icon-mail" /> My Messages
                      </a>
                    </li>
                    <li>
                      <a href="auth-signin.html" className="dropdown-item">
                        <i className="feather icon-lock" /> Lock Screen
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};


export default SideAndSearchbar;
