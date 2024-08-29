import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditOrderModal from "./EditOrderModel"; // Import the modal component

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to handle the selected order for editing
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [error, setError] = useState(null);

  const searchQuery = useSelector((state) => state.search.query); // Get the search query from the Redux store

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setOrders(response.data.data.orders);
        } else {
          console.error("Failed to retrieve orders:", response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError(
            "You are not authorized to view this content. Please log in."
          );
        } else {
          console.error("Error fetching orders:", error);
          setError("An error occurred while fetching orders.");
        }
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleUpdate = async (updatedOrder) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `/api/order/${updatedOrder.id}`,
        updatedOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Update the orders state with the updated order
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          )
        );
        handleCloseModal(); // Close the modal after update
      } else {
        console.error("Failed to update order:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(`/api/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Remove the deleted order from the state
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          console.log("Order deleted successfully.");
        } else {
          console.error("Failed to delete order:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  // Filter the orders based on the search query
  const filteredOrders = orders.filter((order) =>
    order.products[0].product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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
              <h5>Orders Table</h5>
              <span className="d-block m-t-5">
                For admin only <code>table-order</code> inside ECOMMERCE
              </span>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>S_no.</th>
                      <th>Order Id</th>
                      <th>Product Name</th>
                      <th>Price(₹)</th>
                      <th>Quantity</th>
                      <th>Order date</th>
                      <th>Status</th>
                      <th>Actions</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order._id}</td>
                          <td>{order.products[0].product.title}</td>
                          <td>{order.grand_total}</td>
                          <td>{order.quantity}</td>
                          <td>{order.created_at}</td>
                          <td>{order.status}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => console.log("View order details")}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <i
                              className="feather icon-edit"
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => handleEdit(order)}
                            />
                          </td>
                          <td>
                            <i
                              className="feather icon-delete"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => handleDelete(order._id)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No orders available.
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
        <EditOrderModal
          order={selectedOrder}
          onUpdate={handleUpdate}
          onCancel={handleCloseModal}
        />
      )}
    </>
  );
};

export default OrdersTable;
