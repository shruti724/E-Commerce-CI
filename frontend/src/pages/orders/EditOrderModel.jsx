import React, { useState, useEffect } from "react";

const EditOrderModal = ({ order, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (order) {
      setFormData({
        productName: order.productName,
        price: order.price,
        quantity: order.quantity,
        status: order.status,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...order, ...formData }); // Pass updated order data
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Order</h5>
            <button type="button" className="close" onClick={onCancel}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="form-control"
                  value={formData.productName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price(₹)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  value={formData.price || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="form-control"
                  value={formData.quantity || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  className="form-control"
                  value={formData.status || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
