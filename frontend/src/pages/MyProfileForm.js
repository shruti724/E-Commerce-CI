import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideAndSearchbar from "../Components/layouts/SideAndSearchbar";
import Footer from "../Components/layouts/Footer";

const MyProfileForm = () => {
  const navigate = useNavigate();

 
const handleLogout = async () => {
  try {
    console.log("Logging out...")
    // Retrieve the token from localStorage or wherever you store it
    const token = localStorage.getItem("token");

    // Send a POST request to the logout endpoint with the token
    await axios.post("/api/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Clear the token and redirect the user to the login page
    localStorage.removeItem("token");
    navigate("/login");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

  return (
    <>
      <link
        rel="icon"
        href="../assets/images/favicon.ico"
        type="image/x-icon"
      />
      {/* fontawesome icon */}
      <link
        rel="stylesheet"
        href="../assets/fonts/fontawesome/css/fontawesome-all.min.css"
      />
      {/* animation css */}
      <link
        rel="stylesheet"
        href="../assets/plugins/animation/css/animate.min.css"
      />
      {/* vendor css */}
      <link rel="stylesheet" href="../assets/css/style.css" />
      {/* [ Pre-loader ] start */}
      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill" />
        </div>
      </div>
      {/* [ Pre-loader ] End */}
      <SideAndSearchbar />
      {/* [ Main Content ] start */}
      <div >
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  {/* [ breadcrumb ] start */}
                  <div className="page-header">
                    <div className="page-block">
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="page-header-title">
                            <h5 className="m-b-10">My Profile</h5>
                          </div>
                          <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="index.html">
                                <i className="feather icon-home" />
                              </a>
                            </li>
                            <li className="breadcrumb-item">
                              <a href="#!">Form Components</a>
                            </li>
                            <li className="breadcrumb-item">
                              <a href="#!">Form Elements</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [ breadcrumb ] end */}
                  {/* [ Main Content ] start */}
                  <div className="row">
                    {/* [ form-element ] start */}
                    <div className="container my-4">
                      <div className="col-sm-12">
                        <div className="card">
                          <div className="card-header">
                            <h5>ADMIN</h5>
                          </div>
                          <div className="card-body">
                            <h5>My Profile</h5>
                            <hr />
                            <div className="row">
                              <div className="col-md-6 ">
                                {/* From here  */}
                                <div className="col-md-6 col-xl-4 ">
                                  <div className="card user-card">
                                    <div class="card-body text-center d-flex flex-column align-items-center">
                                      <div class="user-image">
                                        <img
                                          src="../assets/images/widget/img-round1.jpg"
                                          class="img-radius wid-100 m-auto"
                                          alt="User-Profile-Image"
                                        />
                                      </div>
                                      <h6 class="f-w-600 m-t-25 m-b-10">
                                        Guest
                                      </h6>
                                      <p>
                                        Active(static) | Male | Born 23.05.1992
                                      </p>
                                      <hr />
                                      <p class="m-t-15">Edit Profile Image</p>
                                    </div>
                                  </div>
                                </div>

                                {/* User Details */}
                                <form>
                                  <div className="form-group">
                                    <div className="form-group">
                                      <label>First Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your first name"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label>Last Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your family name"
                                      />
                                    </div>

                                    <label>Mobile Number</label>
                                    <div className="input-group mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="+91 000-0000-000"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                      />
                                      <div className="input-group-append">
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                        >
                                          Update
                                        </button>
                                      </div>
                                    </div>

                                    <label htmlFor="exampleInputEmail1">
                                      Email ID
                                    </label>
                                    <div className="input-group mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="abc@gmail.com"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                      />
                                      <div className="input-group-append">
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                        >
                                          Verify
                                        </button>
                                      </div>
                                    </div>
                                    <small
                                      id="emailHelp"
                                      className="form-text text-muted"
                                    >
                                      We'll never share your email with anyone
                                      else.
                                    </small>
                                  </div>

                                  <div className="form-group form-check">
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="exampleCheck1"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="exampleCheck1"
                                    >
                                      Check me out
                                    </label>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                              <div className="col-md-6">
                                {/* form for address */}
                                <form>
                                  <h5>Manage Address</h5>
                                  <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Pincode"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>State</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="State"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Address Line-1</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="House No., Building Name"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Address Line-2</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Road name, Area, Colony"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect1">
                                      Type of address
                                    </label>
                                    <select
                                      className="form-control"
                                      id="exampleFormControlSelect1"
                                    >
                                      <option>Home</option>
                                      <option>Work</option>
                                    </select>
                                  </div>
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    Submit
                                  </button>
                                  <hr />
                                  <div className="form-group">
                                    <label htmlFor="exampleCheck1">
                                      Deactivate Account
                                    </label>
                                  </div>
                                  <hr />
                                  <div className="form-group">
                                    <label htmlFor="exampleCheck1">
                                      Delete Account
                                    </label>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>

                        <form action="">
                          <div className="card">
                            <div className="card-header">
                              <h4>Payment</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                <label>Card number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your card number"
                                />
                              </div>
                              <div className="form-group">
                                <label>Name on your card</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your name"
                                />
                              </div>
                              <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon3"
                                  >
                                    Valid till
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basic-url"
                                  aria-describedby="basic-addon3"
                                />
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    CCV number
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  aria-label="Amount (to the nearest dollar)"
                                />
                              </div>
                              {/* Submit button */}
                              <button type="submit" className="btn btn-primary">
                                Save Card
                              </button>
                            </div>
                          </div>
                        </form>
                        <form action="">
                          <div className="card">
                            <div className="card-header">
                              <h4>Payment</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-group">
                                <label>Card number</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your card number"
                                />
                              </div>
                              <div className="form-group">
                                <label>Name on your card</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter your name"
                                />
                              </div>
                              <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                  <span
                                    className="input-group-text"
                                    id="basic-addon3"
                                  >
                                    Valid till
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basic-url"
                                  aria-describedby="basic-addon3"
                                />
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    CCV number
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  aria-label="Amount (to the nearest dollar)"
                                />
                              </div>
                              {/* Submit button */}
                              <button type="submit" className="btn btn-primary">
                                Save Card
                              </button>
                            </div>
                          </div>
                        </form>

                        <button
                          type="submit"
                          className="btn btn-danger"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                    {/* [ form-element ] end */}
                    {/* [ Main Content ] end */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyProfileForm;
