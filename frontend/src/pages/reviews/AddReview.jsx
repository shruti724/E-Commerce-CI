import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../features/review/reviewSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // For redirection
import Cookies from "js-cookie";

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError } = useSelector((state) => state.review);
  const [formData, setFormData] = useState({
    product_id: "",
    rating: 0,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      ...formData 
    };

    dispatch(addReview(reviewData))
      .unwrap()
      .then(() => {
        toast.success("Review added successfully!");
        setFormData({
          product_id: "",
          rating: 0,
          comment: "",
        });
      })
      .catch(() => {
        toast.error("Error adding review.");
      });
  };

  return (
    <>
      <SideAndSearchbar />
      <div className="pcoded-main-container">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h4>Add New Review</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Product ID</label>
                <input
                  type="text"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter product ID"
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                >
                  <option value={0}>Select Rating</option>
                  <option value={1}>1 - Poor</option>
                  <option value={2}>2 - Fair</option>
                  <option value={3}>3 - Good</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={5}>5 - Excellent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Comment</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Write your review here"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Add Review
              </button>
              {isError && <p className="text-danger">Failed to add review.</p>}
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default AddReview;
