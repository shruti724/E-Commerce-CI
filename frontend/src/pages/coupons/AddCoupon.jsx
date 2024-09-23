import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon } from "../../features/coupon/couponSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Components/layouts/Footer";
// import "./Coupon.css"

const AddCoupon = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.coupons);

  const [formData, setFormData] = useState({
    code: "",
    coupon_detail: "",
    coupon_min_checkout: "",
    start_date: new Date().toISOString().split("T")[0],
    discount: "",
    type: "percentage",
    expirationDate: new Date().toISOString().split("T")[0],
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCoupon(formData))
      .unwrap()
      .then(() => {
        toast.success("Coupon added successfully!");
        setFormData({
          code: "",
          coupon_detail: "",
          coupon_min_checkout: "",
          start_date: new Date().toISOString().split("T")[0],
          discount: "",
          type: "percentage",
          expirationDate: new Date().toISOString().split("T")[0],
          isActive: true,
        });
      })
      .catch(() => {
        toast.error("Error adding coupon.");
      });
  };

  return (
    <>
      <SideAndSearchbar />
      <div
        className="container d-flex justify-content-center mt-5 "
   
      >
        <div className="card my-4" style={{ maxWidth: "600px", width: "100%" }}>
          <form onSubmit={handleSubmit}>
            <div className="card-header">
              <h4>Add New Coupon</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter coupon code"
                  disabled={loading}
                  required
                />
              </div>
              <div className="form-group">
                <label>Coupon Detail</label>
                <input
                  type="text"
                  name="coupon_detail"
                  value={formData.coupon_detail}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter coupon detail"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Minimum Checkout Amount</label>
                <input
                  type="number"
                  name="coupon_min_checkout"
                  value={formData.coupon_min_checkout}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter minimum checkout amount"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Discount Amount</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter discount amount"
                  disabled={loading}
                  required
                />
              </div>
              <div className="form-group">
                <label>Discount Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                >
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat Amount</option>
                </select>
              </div>
              <div className="form-group">
                <label>Expiration Date</label>
                <input
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                  required
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      isActive: !prevData.isActive,
                    }))
                  }
                  className="form-check-input"
                  id="isActive" // Added id for accessibility
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="isActive">
                  Is Active
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary mb-4"
                disabled={loading}
              >
                Add Coupon
              </button>
              {error && <p className="text-danger">Failed to add coupon.</p>}
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AddCoupon;
