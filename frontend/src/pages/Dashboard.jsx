import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideAndSearchbar from "../Components/layouts/SideAndSearchbar";
import Footer from "../Components/layouts/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [productsDetails, setProductsDetails] = useState(null);
  const [ordersDetails, setOrderDetails] = useState(null);
  const [usersDetails, setUsersDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch user profile data
        const userResponse = await axios.get("/api/profile");
        setUser(userResponse.data.data);

        // Fetch all users' details
        const usersResponse = await axios.get("/api/users");
        setUsersDetails(usersResponse.data.data);

        if (userResponse.data.data.role !== "admin") {
          navigate("/productuserlist");
          return;
        }
        //Fetch all products' details
        const productResponse = await axios.get("api/products");
        setProductsDetails(productResponse.data.pagination);

        const ordersResponse = await axios.get("/api/orders");
        setOrderDetails(ordersResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <SideAndSearchbar />
      {/* [ Header ] end */}
      {/* [ Main Content ] start */}
      <div className="my-12">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  {/* [ breadcrumb ] start */}
                  <div className="page-header">
                    <div className="page-block">
                      <div className="row align-items-center">
                        <div className="col-md-12 my-4">
                          <div className="page-header-title">
                            <h5>Welcome To ECOMMERCE</h5>
                          </div>
                          <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                              <a href="index.html">
                                <i className="feather icon-grid" />
                              </a>
                            </li>
                            <li className="breadcrumb-item">
                              <a href="#!">Admin Dashboard</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [ breadcrumb ] end */}
                  {/* [ Main Content ] start */}
                  <div className="row">
                    {/* product profit start */}
                    <div className="col-xl-3 col-md-6">
                      <div className="card prod-p-card bg-c-red">
                        <div className="card-body">
                          <div className="row align-items-center m-b-25">
                            <div className="col">
                              <h6 className="m-b-5 text-white">
                                Total Sales Amount
                              </h6>
                              <h3 className="m-b-0 text-white">
                                ₹
                                {ordersDetails
                                  ? ordersDetails.totalSalesAmount
                                  : 1234}
                              </h3>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-money-bill-alt text-c-red f-18" />
                            </div>
                          </div>
                          <p className="m-b-0 text-white">
                            <span className="label label-danger m-r-10">
                              +11%
                            </span>
                            From Previous Month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card prod-p-card bg-c-blue">
                        <div className="card-body">
                          <div className="row align-items-center m-b-25">
                            <div className="col">
                              <h6 className="m-b-5 text-white">Total Orders</h6>
                              <h3 className="m-b-0 text-white">
                                {ordersDetails
                                  ? ordersDetails.totalItems
                                  : 1235}
                              </h3>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-database text-c-blue f-18" />
                            </div>
                          </div>
                          <p className="m-b-0 text-white">
                            <span className="label label-primary m-r-10">
                              +12%
                            </span>
                            From Previous Month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card prod-p-card bg-c-green">
                        <div className="card-body">
                          <div className="row align-items-center m-b-25">
                            <div className="col">
                              <h6 className="m-b-5 text-white">
                                Total Products
                              </h6>
                              <h3 className="m-b-0 text-white">
                                {productsDetails
                                  ? productsDetails.total
                                  : "5432"}
                              </h3>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-dollar-sign text-c-green f-18" />
                            </div>
                          </div>
                          <p className="m-b-0 text-white">
                            <span className="label label-success m-r-10">
                              +52%
                            </span>
                            From Previous Month
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                      <div className="card prod-p-card bg-c-yellow">
                        <div className="card-body">
                          <div className="row align-items-center m-b-25">
                            <div className="col">
                              <h6 className="m-b-5 text-white">Total Users</h6>
                              <h3 className="m-b-0 text-white">
                                {usersDetails
                                  ? usersDetails.totalUsers
                                  : "12345"}
                              </h3>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-tags text-c-yellow f-18" />
                            </div>
                          </div>
                          <p className="m-b-0 text-white">
                            <span className="label label-warning m-r-10">
                              +52%
                            </span>
                            From Previous Month
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* product profit end */}

                    <div className="col-md-12 col-xl-4">
                      <div className="card card-social">
                        <div className="card-block border-bottom">
                          <div className="row align-items-center justify-content-center">
                            <div className="col-auto">
                              <img
                                src="../assets/images/auth/img-auth-2.jpg"
                                alt=""
                                className="img-fluid"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  display: "block",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>

                            <div className="col text-right">
                              <h3>10,500</h3>
                              <h5 className="text-c-red mb-0">
                                +5.9%{" "}
                                <span className="text-muted">Total Likes</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="card-block">
                          <div className="row align-items-center justify-content-center card-active">
                            <div className="col-6">
                              <h6 className="text-center m-b-10">
                                <span className="text-muted m-r-5">
                                  Target:
                                </span>
                                35,098
                              </h6>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-c-blue"
                                  role="progressbar"
                                  style={{ width: "60%", height: 6 }}
                                  aria-valuenow={60}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <h6 className="text-center  m-b-10">
                                <span className="text-muted m-r-5">
                                  Duration:
                                </span>
                                350
                              </h6>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-c-green"
                                  role="progressbar"
                                  style={{ width: "45%", height: 6 }}
                                  aria-valuenow={45}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-4">
                      <div className="card card-social">
                        <div className="card-block border-bottom">
                          <div className="row align-items-center justify-content-center">
                            <div className="col-auto">
                              <img
                                src="../assets/images/auth/img-auth-3.jpg"
                                alt=""
                                className="img-fluid"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  display: "block",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>
                            <div className="col text-right">
                              <h3>10,500</h3>
                              <h5 className="text-c-red mb-0">
                                +5.9%{" "}
                                <span className="text-muted">Total Likes</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="card-block">
                          <div className="row align-items-center justify-content-center card-active">
                            <div className="col-6">
                              <h6 className="text-center m-b-10">
                                <span className="text-muted m-r-5">
                                  Target:
                                </span>
                                34,185
                              </h6>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-c-blue"
                                  role="progressbar"
                                  style={{ width: "40%", height: 6 }}
                                  aria-valuenow={40}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <h6 className="text-center  m-b-10">
                                <span className="text-muted m-r-5">
                                  Duration:
                                </span>
                                800
                              </h6>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-c-green"
                                  role="progressbar"
                                  style={{ width: "70%", height: 6 }}
                                  aria-valuenow={70}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xl-4">
                      <div className="card card-social">
                        <div className="card-block border-bottom">
                          <div className="row align-items-center justify-content-center">
                            <div className="col-auto">
                              <img
                                src="../assets/images/auth/img-auth-1.jpg"
                                alt=""
                                className="img-fluid"
                                style={{
                                  maxWidth: "100%",
                                  height: "auto",
                                  display: "block",
                                  objectFit: "cover",
                                  borderRadius: "5px",
                                }}
                              />
                            </div>
                            <div className="col text-right">
                              <h3>500</h3>
                              <h5 className="text-c-red mb-0">
                                +5.9%{" "}
                                <span className="text-muted">
                                  <s>1999</s>
                                </span>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="card-block">
                          <div className="row align-items-center justify-content-center card-active">
                            <div className="col-6">
                              <h6 className="text-center m-b-10">
                                <span className="text-muted m-r-5">
                                  Target:
                                </span>
                                25,998
                              </h6>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-c-blue"
                                  role="progressbar"
                                  style={{ width: "80%", height: 6 }}
                                  aria-valuenow={80}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <h6 className="text-center  m-b-10">
                                <span className="text-muted m-r-5">
                                  Duration:
                                </span>
                                900
                              </h6>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-c-green"
                                  role="progressbar"
                                  style={{ width: "50%", height: 6 }}
                                  aria-valuenow={50}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* sessions-section start */}
                    <div className="col-xl-8 col-md-6">
                      <div className="card table-card">
                        <div className="card-header">
                          <h5>Site visitors session log</h5>
                        </div>
                        <div className="card-body px-0 py-0">
                          <div className="table-responsive">
                            <div
                              className="session-scroll"
                              style={{ height: 478, position: "relative" }}
                            >
                              <table className="table table-hover m-b-0">
                                <thead>
                                  <tr>
                                    <th>
                                      <span>CAMPAIGN DATE</span>
                                    </th>
                                    <th>
                                      <span>
                                        CLICK{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                    <th>
                                      <span>
                                        COST{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                    <th>
                                      <span>
                                        CTR{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                    <th>
                                      <span>
                                        ARPU{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                    <th>
                                      <span>
                                        ECPI{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                    <th>
                                      <span>
                                        ROI{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                    <th>
                                      <span>
                                        REVENUE{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                    <th>
                                      <span>
                                        CONVERSIONS{" "}
                                        <a
                                          className="help"
                                          data-toggle="popover"
                                          title="Popover title"
                                          data-content="And here's some amazing content. It's very engaging. Right?"
                                        >
                                          <i className="feather icon-help-circle f-16" />
                                        </a>
                                      </span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Total and average</td>
                                    <td>1300</td>
                                    <td>1025</td>
                                    <td>14005</td>
                                    <td>95,3%</td>
                                    <td>29,7%</td>
                                    <td>3,25</td>
                                    <td>2:30</td>
                                    <td>45.5%</td>
                                  </tr>
                                  <tr>
                                    <td>8-11-2016</td>
                                    <td>
                                      786
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "60%" }}
                                          aria-valuenow={60}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      485
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-primary rounded"
                                          role="progressbar"
                                          style={{ width: "50%" }}
                                          aria-valuenow={50}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      769
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      45,3%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "60%" }}
                                          aria-valuenow={60}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      6,7%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-info rounded"
                                          role="progressbar"
                                          style={{ width: "30%" }}
                                          aria-valuenow={30}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      8,56
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "40%" }}
                                          aria-valuenow={40}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      10:55
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      33.8%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "40%" }}
                                          aria-valuenow={40}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>15-10-2016</td>
                                    <td>
                                      786
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "65%" }}
                                          aria-valuenow={65}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      523
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-primary rounded"
                                          role="progressbar"
                                          style={{ width: "80%" }}
                                          aria-valuenow={80}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      736
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "80%" }}
                                          aria-valuenow={80}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      78,3%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      6,6%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-info rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      7,56
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "44%" }}
                                          aria-valuenow={44}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      4:30
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "68%" }}
                                          aria-valuenow={68}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      76.8%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "90%" }}
                                          aria-valuenow={90}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>8-8-2017</td>
                                    <td>
                                      624
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "45%" }}
                                          aria-valuenow={45}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      436
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-primary rounded"
                                          role="progressbar"
                                          style={{ width: "55%" }}
                                          aria-valuenow={55}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      756
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "95%" }}
                                          aria-valuenow={95}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      78,3%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "38%" }}
                                          aria-valuenow={38}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      6,4%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-info rounded"
                                          role="progressbar"
                                          style={{ width: "30%" }}
                                          aria-valuenow={30}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      9,45
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "41%" }}
                                          aria-valuenow={41}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      9:05
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "67%" }}
                                          aria-valuenow={67}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      8.63%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "41%" }}
                                          aria-valuenow={41}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>11-12-2017</td>
                                    <td>
                                      423
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "54%" }}
                                          aria-valuenow={54}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      123
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-primary rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      756
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "75%" }}
                                          aria-valuenow={75}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      78,6%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "60%" }}
                                          aria-valuenow={60}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      45,6%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-info rounded"
                                          role="progressbar"
                                          style={{ width: "90%" }}
                                          aria-valuenow={90}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      6,85
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "30%" }}
                                          aria-valuenow={30}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      7:45
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "40%" }}
                                          aria-valuenow={40}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      33.8%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "80%" }}
                                          aria-valuenow={80}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>8-11-2016</td>
                                    <td>
                                      786
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "60%" }}
                                          aria-valuenow={60}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      485
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-primary rounded"
                                          role="progressbar"
                                          style={{ width: "50%" }}
                                          aria-valuenow={50}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      769
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      45,3%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "60%" }}
                                          aria-valuenow={60}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      6,7%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-info rounded"
                                          role="progressbar"
                                          style={{ width: "30%" }}
                                          aria-valuenow={30}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      8,56
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "40%" }}
                                          aria-valuenow={40}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      10:55
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      33.8%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "40%" }}
                                          aria-valuenow={40}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>15-10-2016</td>
                                    <td>
                                      786
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "65%" }}
                                          aria-valuenow={65}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      523
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-primary rounded"
                                          role="progressbar"
                                          style={{ width: "80%" }}
                                          aria-valuenow={80}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      736
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "80%" }}
                                          aria-valuenow={80}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      78,3%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      6,6%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-info rounded"
                                          role="progressbar"
                                          style={{ width: "70%" }}
                                          aria-valuenow={70}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      7,56
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "44%" }}
                                          aria-valuenow={44}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      4:30
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "68%" }}
                                          aria-valuenow={68}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      76.8%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "90%" }}
                                          aria-valuenow={90}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>8-8-2017</td>
                                    <td>
                                      624
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "45%" }}
                                          aria-valuenow={45}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      436
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-primary rounded"
                                          role="progressbar"
                                          style={{ width: "55%" }}
                                          aria-valuenow={55}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      756
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "95%" }}
                                          aria-valuenow={95}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      78,3%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "38%" }}
                                          aria-valuenow={38}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      6,4%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-info rounded"
                                          role="progressbar"
                                          style={{ width: "30%" }}
                                          aria-valuenow={30}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      9,45
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-danger rounded"
                                          role="progressbar"
                                          style={{ width: "41%" }}
                                          aria-valuenow={41}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      9:05
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-warning rounded"
                                          role="progressbar"
                                          style={{ width: "67%" }}
                                          aria-valuenow={67}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      8.63%
                                      <div
                                        className="progress mt-1"
                                        style={{ height: 4 }}
                                      >
                                        <div
                                          className="progress-bar bg-success rounded"
                                          role="progressbar"
                                          style={{ width: "41%" }}
                                          aria-valuenow={41}
                                          aria-valuemin={0}
                                          aria-valuemax={100}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* sessions-section end */}
                    <div className="col-md-6 col-xl-4">
                      <div className="card user-card">
                        <div className="card-header">
                          <h5>Profile</h5>
                        </div>
                        {/* ----------------------------------------------------------------------------------------------=====================================================================================                             */}

                        <div className="card-body  text-center">
                          <div className="user-image">
                            <img
                              // src={`${process.env.PUBLIC_URL}/assets/images/widget/img-round1.jpg`}{user.name}
                              src="../assets/images/widget/img-round1.jpg"
                              className="img-radius wid-100 m-auto"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h6 className="f-w-600 m-t-25 m-b-10">
                            {user ? user.username : "Guest"}
                            {/*  dynamically repace name extracting from token  */}
                          </h6>
                          <p>{user.status} | Male | Born 23.05.1992</p>
                          <hr />
                          <p className="m-t-15">Activity Level: 87%</p>
                          <div className="bg-c-blue counter-block m-t-10 p-20">
                            <div className="row">
                              <div className="col-4">
                                <i className="fas fa-calendar-check text-white f-20" />
                                <h6 className="text-white mt-2 mb-0">1256</h6>
                              </div>
                              <div className="col-4">
                                <i className="fas fa-user text-white f-20" />
                                <h6 className="text-white mt-2 mb-0">8562</h6>
                              </div>
                              <div className="col-4">
                                <i className="fas fa-folder-open text-white f-20" />
                                <h6 className="text-white mt-2 mb-0">189</h6>
                              </div>
                            </div>
                          </div>
                          <p className="m-t-15">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </p>
                          <hr />
                          <div className="row justify-content-center user-social-link">
                            <div className="col-auto">
                              <a href="#!">
                                <i className="fab fa-facebook-f text-primary f-22" />
                              </a>
                            </div>
                            <div className="col-auto">
                              <a href="#!">
                                <i className="fab fa-twitter text-c-info f-22" />
                              </a>
                            </div>
                            <div className="col-auto">
                              <a href="#!">
                                <i className="fab fa-dribbble text-c-red f-22" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [ Main Content ] end */}
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

export default Dashboard;
