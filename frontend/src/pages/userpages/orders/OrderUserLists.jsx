import React from "react";
import { useSelector } from "react-redux";
import SideAndSearchbar from "../../../Components/layouts/SideAndSearchbar";
import {Link} from "react-router-dom"
import Footer from "../../../Components/layouts/Footer";

const OrderUserList = () => {
  const { orders, loading, error } = useSelector((state) => state.orderUser);
  console.log(orders);

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error}</div>;


  

  return (
    <>
      <SideAndSearchbar />
      <main>
        <h1 className="mx-4 my-4">Your Orders</h1>
        {orders && orders.length === 0 ? (
            <div className=" mx-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
                  src="/assets/images/bag.jpg"
                  alt="Empty Order"
                />
                <div className="card-body">
                  <h5 className="card-title">Your order is empty !!</h5>
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
          ): (
            <div className="wishlist-items">
              {orders.map((item) => (
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
                  {/* <button
                    className="remove-button btn btn-danger"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button> */}
                  <Link to={`/product/${item.product_id._id}`}>
                    <button className="view-button btn btn-info">
                      View Product
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
      </main>
      <Footer/>
    </>
  );
};

export default OrderUserList;
