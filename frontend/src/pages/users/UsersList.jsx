import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  updateUser,
  deleteUser,
} from "../../features/user/userSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, totalPages, currentPage, totalUsers, loading, error } =
    useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  console.log("users:", users);
  console.log("totalPages:", totalPages);
  console.log("currentPage:", currentPage);
  console.log("totalUsers:", totalUsers);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }

    dispatch(getUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = (updatedUser) => {
    dispatch(updateUser(updatedUser));
    handleCloseModal();
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <SideAndSearchbar />
      <div className="pcoded-main-container">
        <div className="col-xl-12 d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-header">
              <h5>Users List</h5>
              <span className="d-block m-t-5">
                For admin only <code>table-user</code> inside ECOMMERCE
              </span>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>S_no.</th>
                      <th>User Id</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Actions</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td>{user._id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.role}</td>
                          <td>{user.status}</td>
                          <td>
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => console.log("View user details")}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <i
                              className="feather icon-edit"
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => handleEdit(user)}
                            />
                          </td>
                          <td>
                            <i
                              className="feather icon-delete"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => handleDelete(user._id)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          {loading ? "Loading users..." : "No users available."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <p>
                  Page {currentPage} of {totalPages} ({totalUsers} users)
                </p>
                {/* Add pagination controls here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditUserModal
          user={selectedUser}
          onUpdate={handleUpdate}
          onCancel={handleCloseModal}
        />
      )}
    </>
  );
};

export default UsersList;
