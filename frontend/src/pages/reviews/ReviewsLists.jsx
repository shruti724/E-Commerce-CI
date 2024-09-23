import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviews,
  deleteReview,
  bulkDelete,
  updateReviewStatus,
} from "../../features/review/reviewSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditReviewModal from "./EditReviewModal";
import Footer from "../../Components/layouts/Footer";

function ReviewsList() {
  const dispatch = useDispatch();
  const { isLoading, data=[], isError } = useSelector((state) => state.review);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    dispatch(fetchReviews({ page, limit })).then((response) => {
      setTotalPages(response.totalPages || 1);
    });
  }, [dispatch, page, limit]);

  const handleDelete = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm("Are you sure you want to delete the selected reviews?")) {
      dispatch(bulkDelete(selectedReviews));
      setSelectedReviews([]);
    }
  };

  const handleBulkUpdateStatus = (status) => {
    if (window.confirm(`Are you sure you want to ${status === "approved" ? "approve" : "reject"} the selected reviews?`)) {
      selectedReviews.forEach((reviewId) => {
        dispatch(updateReviewStatus({ reviewId, status }));
      });
      setSelectedReviews([]);
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  const handleSelectReview = (reviewId) => {
    setSelectedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  console.log("data: ",data)
  const filteredData = data
    .filter((review) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (review.user.username.toLowerCase().includes(searchLower) ||
          review._id.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading reviews...</h1>;
  }

  return (
    <>
      <SideAndSearchbar />
      <div>
        <div className="col-xl-12 d-flex justify-content-center mt-5 mb-4 ">
          <div className="card my-4">
            <div className="card-header">
              <h5>Reviews List</h5>
              <span className="d-block m-t-5">
                For admin only <code>table-review</code> inside ECOMMERCE
              </span>
            </div>
            <div className="card-body">
              <div className="status-filter d-flex justify-content-between">
                <div>
                  <span
                    className={
                      statusFilter === "All" ? "text-primary" : "text-secondary"
                    }
                    onClick={() => setStatusFilter("All")}
                    style={{ cursor: "pointer" }}
                  >
                    All ({data.length})
                  </span>
                  <span className="mx-2">|</span>
                  <span
                    className={
                      statusFilter === "approved"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("approved")}
                    style={{ cursor: "pointer" }}
                  >
                    Approved (
                    {data.filter((r) => r.status === "approved").length})
                  </span>
                  <span className="mx-2">|</span>
                  <span
                    className={
                      statusFilter === "pending"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("pending")}
                    style={{ cursor: "pointer" }}
                  >
                    Pending ({data.filter((r) => r.status === "pending").length}
                    )
                  </span>
                  <span className="mx-2">|</span>
                  <span
                    className={
                      statusFilter === "rejected"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("rejected")}
                    style={{ cursor: "pointer" }}
                  >
                    Rejected (
                    {data.filter((r) => r.status === "rejected").length})
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <span className="mx-2">
                    <input
                      type="text"
                      placeholder="Search by user, product, or review ID"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control me-2"
                    />
                  </span>
                  <button type="button" className="btn btn-primary btn-sm">
                    Search
                  </button>
                </div>
              </div>
              <div>
                <span>
                  <select
                    className="form-select me-2"
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                  >
                    <option value="">Bulk actions</option>
                    <option value="bulk-approve">Bulk Approve</option>
                    <option value="bulk-reject">Bulk Reject</option>
                    <option value="bulk-delete">Bulk Delete</option>
                  </select>
                </span>
                <span className="mx-1">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      if (bulkAction === "bulk-delete") handleBulkDelete();
                      if (bulkAction === "bulk-approve")
                        handleBulkUpdateStatus("approved");
                      if (bulkAction === "bulk-reject")
                        handleBulkUpdateStatus("rejected");
                    }}
                  >
                    Apply
                  </button>
                </span>
              </div>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>S_no.</th>
                      <th>Review ID</th>
                      <th>User</th>
                      <th>Product</th>
                      <th>Rating</th>
                      <th>Review</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((review, index) => (
                        <tr key={review._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedReviews.includes(review._id)}
                              onChange={() => handleSelectReview(review._id)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{review._id}</td>
                          <td>{review.user.username}</td>
                          <td>{review.product.title}</td>
                          <td>{review.rating}</td>
                          <td>{review.comment}</td>
                          <td>{review.status}</td>
                          <td>
                            {new Date(review.updated_at).toLocaleDateString()}
                          </td>
                          <td className="d-flex align-items-center">
                            <button
                              className="btn btn-icon"
                              onClick={() => handleEdit(review)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-icon"
                              onClick={() => handleDelete(review._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          No reviews found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button
                  className="btn btn-primary"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn btn-primary"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedReview && (
        <EditReviewModal review={selectedReview} onClose={handleCloseModal} />
      )}
      <Footer/>
    </>
  );
}

export default ReviewsList;
