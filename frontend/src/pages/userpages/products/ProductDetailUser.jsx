import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../../features/userfeatures/product/productUserSlice";
import { addToCart } from "../../../features/userfeatures/cart/cartUserSilce";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { product, loading, error } = useSelector((state) => state.productUser);
  console.log("product: ", product)
  console.log("id: ", id)

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product_id: id, quantity }))
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
            "Not enough stock available to add the requested quantity."
          );
        } else {
          toast.error("Failed to add product to cart. Please try again.");
        }
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="product-detail-container">
        <div className="container my-4">
          <h2 className="mb-4">{product.title}</h2>
          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  product.product_front_image?.path || "/assets/images/bag.jpg"
                }
                alt={product.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <p>
                <strong>Description:</strong> {product.description}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
              <p>
                <strong>Available Stock:</strong> {product.stock}
              </p>
              <div className="d-flex align-items-center mb-3">
                <label htmlFor="quantity" className="me-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="form-control w-25"
                />
              </div>
              <button className="btn btn-info me-2" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <Link to="/cart">
                <button className="btn btn-success">View Cart</button>
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/products">
              <button className="btn btn-primary">Back to Products</button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetailUser;
