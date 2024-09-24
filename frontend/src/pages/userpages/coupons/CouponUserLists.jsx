import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../../../features/userfeatures/coupon/couponUserSlice";
import { Link } from "react-router-dom";
import SideAndSearchbar from "../../../Components/layouts/SideAndSearchbar";
import Footer from "../../../Components/layouts/Footer";

const CouponUserList = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.couponUser);
  console.log("coupon: ", coupons)

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <SideAndSearchbar />
      <main>
        <div className="coupons-page-container">
          <h2 className="coupons-title mx-4 my-4">Available Coupons</h2>
          {coupons && coupons.length === 0 ? (
            <div className="empty-coupons mx-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src="/assets/images/no-coupons.jpg"
                  alt="No Coupons Available"
                />
                <div className="card-body">
                  <h5 className="card-title">No Coupons Available!</h5>
                  <p className="card-text">Check back later for new coupons.</p>
                  <Link to="/products">
                    <button className="btn btn-primary">Shop Now</button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {coupons.map((coupon) => (
                <div key={coupon._id} className="col-md-3 mb-4">
                  <div className="card mx-2" style={{ width: "100%" }}>
                    <div className="card-body">
                      <h3 className="card-title">{coupon.code}</h3>
                      <p className="card-text">
                        {coupon.coupon_detail ||
                          "No additional details available."}
                      </p>
                      <p className="card-text">
                        Minimum Checkout: ${coupon.coupon_min_checkout}
                      </p>
                      <p className="card-text">
                        Discount:{" "}
                        {coupon.type === "flat"
                          ? `$${coupon.discount} off`
                          : `${coupon.discount}% off`}
                      </p>
                      <p className="card-text">
                        Valid From:{" "}
                        {new Date(coupon.start_date).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        Expires On:{" "}
                        {new Date(coupon.expirationDate).toLocaleDateString()}
                      </p>
                      <p
                        className={`card-text ${
                          coupon.isActive ? "text-success" : "text-danger"
                        }`}
                      >
                        {coupon.isActive ? "Active" : "Expired"}
                      </p>
                      <Link to="/products">
                        <button className="btn btn-info btn-sm">
                          Apply Coupon
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default CouponUserList;
