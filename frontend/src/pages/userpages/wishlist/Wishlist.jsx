import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
  addToWishlist,
} from "../../../features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";
import SideAndSearchbar from "../../../Components/layouts/SideAndSearchbar";
import Footer from "../../../Components/layouts/Footer";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToWishlist = (product_id) => {
    dispatch(addToWishlist(product_id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <SideAndSearchbar />
      <main >
        <div className="wishlist-page-container ">
          <h2 className="wishlist-title mx-4 my-4 ">My Wishlist</h2>
          {wishlist && wishlist.length === 0 ? (
            <div className="empty-wishlist mx-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src="/assets/images/bag.jpg"
                  alt="Empty Wishlist"
                />
                <div className="card-body">
                  <h5 className="card-title">Your wishlist is empty !!</h5>
                  <p className="card-text">
                    Explore more and shortlist some items.
                  </p>
                  <Link to="/productlist">
                    <button className="explore-button btn btn-primary">
                      Explore
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="wishlist-items">
              {wishlist.map((item) => (
                <div key={item._id} className="wishlist-card">
                  <img
                    src={item.product_id.image}
                    alt={item.product_id.title}
                    className="wishlist-item-image"
                  />
                  <h3 className="wishlist-item-title">
                    {item.product_id.title}
                  </h3>
                  <p className="wishlist-item-description">
                    {item.product_id.description}
                  </p>
                  <button
                    className="remove-button btn btn-danger"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                  <Link to={`/product/${item.product_id._id}`}>
                    <button className="view-button btn btn-info">
                      View Product
                    </button>
                  </Link>
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

export default Wishlist;
