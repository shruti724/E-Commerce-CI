import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", loginData);
      console.log(response.data); 
      if (response.data.success) {
        localStorage.setItem("token", response.data.token); 
        navigate("/"); 
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };
 
  return (
    <>
      {/* <a href="https://www.flaticon.com/free-icons/edit" title="edit icons">
       
      </a> */}
      <div className="auth-wrapper">
        <div className="auth-content container">
          <div className="card">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="card-body">
                  <img
                    src="../assets/images/logo-image.png"
                    alt=""
                    className="img-fluid mb-4"
                  />
                  <h4 className="mb-3 f-w-400">Login into your account</h4>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-mail" />
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email address"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-lock" />
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group text-left mt-2">
                      <div className="checkbox checkbox-primary d-inline">
                        <input
                          type="checkbox"
                          name="remember"
                          id="checkbox-fill-a1"
                        />
                        <label htmlFor="checkbox-fill-a1" className="cr">
                          {" "}
                          Save credentials
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary mb-4">
                      Login
                    </button>
                  </form>
                  <p className="mb-2 text-muted">
                    Forgot password?{" "}
                    <a href="auth-reset-password.html" className="f-w-400">
                      Reset
                    </a>
                  </p>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="f-w-400">
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="../assets/images/auth-bg.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-fab">
        <div className="b-bg">
          <i className="fas fa-question" />
        </div>
        <div className="fab-hover">
          <ul className="list-unstyled">
            <li>
              <a
                href="../doc/index-bc-package.html"
                target="_blank"
                data-text="UI Kit"
                className="btn btn-icon btn-rounded btn-info m-0"
              >
                <i className="feather icon-layers" />
              </a>
            </li>
            <li>
              <a
                href="../doc/index.html"
                target="_blank"
                data-text="Document"
                className="btn btn-icon btn-rounded btn-primary m-0"
              >
                <i className="feather icon feather icon-book" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Login;
