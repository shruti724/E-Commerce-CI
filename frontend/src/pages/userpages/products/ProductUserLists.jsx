import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/userfeatures/product/productUserSlice";
import {addToCart} from "../../../features/userfeatures/cart/cartUserSilce"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast functions
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify
import SideAndSearchbar from "../../../Components/layouts/SideAndSearchbar";
import Footer from "../../../Components/layouts/Footer";

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productUser
  );
  console.log("products: ",products)
  


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
          ); // Show error toast
        } else {
          toast.error("Failed to add product to cart. Please try again."); 
        }
      });
  };
  

  return (
    <>
      <SideAndSearchbar />
      <main >
        <h2 className="my-4 mx-4">Products List</h2>
        {products && products.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="card mx-4" style={{ width: "18rem" }}>
                <img
                  className="card-img-top"
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
              <div key={product._id} className="col-md-3 mb-4">
                <div className="card mx-4" style={{ width: "100%" }}>
                  <Link to="/productdetailuser">
                    <img
                      src={
                        product.product_front_image?.path ||
                        "/assets/images/bag.jpg"
                      }
                      alt={product.product_front_image?.alt || product.title}
                      className="card-img-top"
                    />
                  </Link>
                  <span className="pcoded-micon mx-4">
                    <i
                      className="feather icon-heart"
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                  </span>
                  <div className="card-body">
                    <span>
                      <h3 className="card-title">{product.title}</h3>
                    </span>

                    <p className="card-text">{product.short_description}</p>
                    <p className="card-price">${product.price}</p>
                    <span>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleAddToCart(product._id, 1)}
                      >
                        Cart it
                      </button>
                    </span>
                    <span className="mx-1">
                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-info btn-sm">Buy Now</button>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <ToastContainer />
      <Footer/>
    </>
  );
};

export default ProductsList;
