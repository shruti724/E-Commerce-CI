import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/authSlice";
// import axios from "axios";

const Signup = () => {
  
  // const [error, setError] = useState("");
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
  try {
    const actionResult = await dispatch(signupUser(formData));
    if (signupUser.fulfilled.match(actionResult)) {
      navigate("/"); 
    } else {

      console.error(error);
    }
  } catch (error) {
    console.error(error);
      
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
        content="admin templates, bootstrap admin templates, bootstrap 4, dashboard, dashboard templets, sass admin templets, html admin templates, responsive, bootstrap admin templates free download,premium bootstrap admin templates, Flash Able, Flash Able bootstrap admin template"
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
                    <div className="form-group text-left mt-2">
                      <div className="checkbox checkbox-primary d-inline">
                        <input
                          type="checkbox"
                          name="newsletter"
                          id="checkbox-fill-2"
                        />
                        <label htmlFor="checkbox-fill-2" className="cr">
                          Send me the <a href="#!">Newsletter</a> weekly.
                        </label>
                      </div>
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
                <i className="feather icon-book" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Signup;
