import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { signupUser } from "../features/auth/authSlice";
import axios from "axios";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting signup with data: ", formData);

        try {
            const response = await axios.post(
              `https://e-commerce-ci-backend.onrender.com/api/register`,
              formData
            );
            console.log("env: ", process.env.REACT_API_APP)
            console.log("Signup successful, navigating to home.", response);
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message || error);
        }
    };


  return (
    <>
      <title>ECOMMERCE - Most Trusted Shopping Site.</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui"
      />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="description"
        content="Flash Able Bootstrap admin template made using Bootstrap 4 and it has huge amount of ready made feature, UI components, pages which completely fulfills any dashboard needs."
      />
      <meta
        name="keywords"
        content="admin templates, bootstrap admin templates, bootstrap 4, dashboard"
      />
      <meta name="author" content="Codedthemes" />
      <link
        rel="icon"
        href="../assets/images/favicon.ico"
        type="image/x-icon"
      />
      <link
        rel="stylesheet"
        href="../assets/fonts/fontawesome/css/fontawesome-all.min.css"
      />
      <link
        rel="stylesheet"
        href="../assets/plugins/animation/css/animate.min.css"
      />
      <link rel="stylesheet" href="../assets/css/style.css" />

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
                  <h4 className="mb-3 f-w-400">Sign up into your account</h4>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="feather icon-user" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
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
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary mb-4">
                      Sign up
                    </button>
                  </form>
                  <p className="mb-2">
                    Already have an account?{" "}
                    <Link to="/" className="f-w-400">
                      Log in
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
    </>
  );
};

export default Signup;
