import React, { useEffect, useState } from "react";
import axios from "axios";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditUserModal from "./EditUserModal";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [error, setError] = useState(null);
  

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUsers(response.data.data.users);
          
        } else {
          console.error("Failed to retrieve users:", response.data.message);
        navigate('/login')
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError(
            "You are not authorized to view this content. Please log in."
          );
          navigate('/login')
        } else {
          console.error("Error fetching users:", error);
          setError("An error occurred while fetching users.");
        }
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user); 
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleUpdate = async (updatedUser) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `/api/user/${updatedUser._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Update the users state with the updated user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        handleCloseModal(); // Close the modal after update
      } else {
        console.error("Failed to update user:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(`/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Remove the deleted user from the state
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
          console.log("User deleted successfully.");
        } else {
          console.error("Failed to delete user:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
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
                    {users.length > 0 ? (
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
                          No users available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
