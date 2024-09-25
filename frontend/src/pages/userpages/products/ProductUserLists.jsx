import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/userfeatures/product/productUserSlice";
import { addToCart } from "../../../features/userfeatures/cart/cartUserSilce";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideAndSearchbar from "../../../Components/layouts/SideAndSearchbar";
import Footer from "../../../Components/layouts/Footer";

const ProductsUserList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productUser
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleAddToCart = (productId, quantity) => {
    dispatch(addToCart({ product_id: productId, quantity }))
      .unwrap()
      .then(() => {
        toast.success("Product added to cart successfully!");
      })
      .catch((err) => {
        if (
          err.message ===
          "Not enough stock available to add the requested quantity"
        ) {
          toast.error(
            "Not enough stock available to add the requested quantity"
          );
        } else {
          toast.error("Failed to add product to cart. Please try again.");
        }
      });
  };

  return (
    <>
      <SideAndSearchbar />
      <main className="container my-3">
        {/* <h2 className="my-4 mx-4">Products List</h2> */}
        {products && products.length === 0 ? (
          <div className="row">
            <div className="col-12 ">
              <div className="card mx-4 " style={{ width: "18rem" }}>
                <img
                  className="card-img-top img-fluid"
                  src="/assets/images/bag.jpg"
                  alt="Empty Products"
                />
                <div className="card-body">
                  <h5 className="card-title">No products available!</h5>
                  <p className="card-text">
                    Browse categories and explore new products.
                  </p>
                  <Link to="/categories">
                    <button className="btn btn-primary">
                      Explore Categories
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-6 col-md-6 mb-4">
                <div
                  className="card"
                  style={{ width: "90%", margin: "0 auto" }}
                >
                  <Link to="/productdetailuser">
                    <div >
                      {" "}
                      <img
                        src={
                          product.product_front_image?.path ||
                          "/assets/images/bag.jpg"
                        }
                        alt={product.product_front_image?.alt || product.title}
                        className="card-img-top img-fluid"
                      />
                    </div>
                  </Link>
                  <div className="card-body p-2">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text ">{product.short_description}</p>
                    <p className="card-price">${product.price}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleAddToCart(product._id, 1)}
                      >
                        Cart it
                      </button>
                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-info btn-sm mx-1">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default ProductsUserList;
