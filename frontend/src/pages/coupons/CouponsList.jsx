import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons, deleteCoupon } from "../../features/coupon/couponSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import Footer from "../../Components/layouts/Footer";
// import "./Coupons.css"; // Assuming you have CSS for styling

const CouponsList = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.coupons);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [bulkAction, setBulkAction] = useState("");

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupon(id));
    }
  };

  const handleBulkDelete = () => {
    if (
      window.confirm("Are you sure you want to delete the selected coupons?")
    ) {
      selectedCoupons.forEach((id) => handleDelete(id));
      setSelectedCoupons([]);
    }
  };

  const handleSelectCoupon = (id) => {
    setSelectedCoupons((prev) =>
      prev.includes(id)
        ? prev.filter((couponId) => couponId !== id)
        : [...prev, id]
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SideAndSearchbar />
      <main>
        <div className="table-responsive">
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              placeholder="Search by coupon code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control me-2"
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleBulkDelete}
              disabled={selectedCoupons.length === 0}
            >
              Bulk Delete
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Select</th>
                <th>Coupon Code</th>
                <th>Details</th>
                <th>Minimum Checkout</th>
                <th>Discount</th>
                <th>Type</th>
                <th>Expiration Date</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length > 0 ? (
                coupons
                  .filter((coupon) =>
                    coupon.code
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((coupon) => (
                    <tr key={coupon._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedCoupons.includes(coupon._id)}
                          onChange={() => handleSelectCoupon(coupon._id)}
                        />
                      </td>
                      <td>{coupon.code}</td>
                      <td>{coupon.coupon_detail}</td>
                      <td>{coupon.coupon_min_checkout}</td>
                      <td>{coupon.discount}</td>
                      <td>{coupon.type}</td>
                      <td>
                        {new Date(coupon.expirationDate).toLocaleDateString()}
                      </td>
                      <td>{coupon.isActive ? "Yes" : "No"}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(coupon._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No coupons available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CouponsList;
