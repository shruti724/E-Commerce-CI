import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/user/userSlice"; // Adjust the import path as needed
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const AddUser = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
    status: "active", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData))
      .unwrap()
      .then((response) => {
        toast.success("User added successfully!");
        console.log(response)
        
      })
      .catch((error) => {
        toast.error("Error adding user.", error);
        console.log("Error: ", error)
      });
  };

  return (
    <>
      <SideAndSearchbar />
      <div className="pcoded-main-container">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h4>Add New User</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter password"
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Add User
              </button>
              {isError && <p className="text-danger">Failed to add user.</p>}
            </div>
          </div>
        </form>
      </div>

      {/* Toast Container for showing toasts */}
      <ToastContainer />
    </>
  );
};

export default AddUser;
