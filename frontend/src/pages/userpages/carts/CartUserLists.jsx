import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeCartItem,
} from "../../../features/userfeatures/cart/cartUserSilce";
import SideAndSearchbar from "../../../Components/layouts/SideAndSearchbar";
import { Link } from "react-router-dom";
import Footer from "../../../Components/layouts/Footer";

const CartUserList = () => {
  const dispatch = useDispatch();
  const {
    cartItems = [],
    loading,
    error,
  } = useSelector((state) => state.cartUser);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeCartItem(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <SideAndSearchbar />
      <main>
        <div className="cart-page-container">
          <h2 className="cart-title mx-4 my-4">Your Cart</h2>
          {cartItems.length === 0 ? (
            <div className="mx-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src="/assets/images/bag.jpg"
                  alt="Empty Cart"
                />
                <div className="card-body">
                  <h5 className="card-title">Your cart is empty!</h5>
                  <p className="card-text">
                    Explore more and add some items to your cart.
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
            <div className="row">
              {Array.isArray(cartItems) &&
                cartItems.map((item) =>
                  item.product_id ? (
                    <div key={item._id} className="col-md-3 mb-4">
                      <div className="card mx-4" style={{ width: "100%" }}>
                        <img
                          src={
                            item.product_id?.images[0] ||
                            "/assets/images/bag.jpg"
                          }
                          alt={item.product_id?.title || "Product Image"}
                          className="card-top-image"
                        />
                        <div className="card-body">
                          <h3 className="cart-item-title">
                            {item.product_id.title}
                          </h3>
                          <p className="cart-item-description">
                            {item.product_id.description}
                          </p>
                          <p className="cart-item-quantity">
                            Quantity: {item.quantity}
                          </p>
                          <p className="cart-item-price">
                            Price: $
                            {item.product_id.discounted_price ||
                              item.product_id.price}
                          </p>
                          <div className="d-flex justify-content-between">
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => handleRemove(item._id)}
                            >
                              Remove
                            </button>
                            <Link to={`/product/${item.product_id._id}`}>
                              <button className="btn btn-info btn-sm">
                                Buy Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={item._id} className="cart-item">
                      <p>No product details available for this item.</p>
                      <p className="cart-item-quantity">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  )
                )}
            </div>
          )}
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default CartUserList;
