// ProductDetailsModal.jsx
import React from "react";
import PropTypes from "prop-types";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
import { Modal, Button } from "react-bootstrap";

const ProductDetailsModal = ({ show, onHide, product }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Product ID:</strong> {product._id}
        </p>
        <p>
          <strong>Price:</strong> {product.price}
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <p>
          <strong>Categories:</strong>{" "}
          {product.categories?.join(", ") || "No categories"}
        </p>
        <p>
          <strong>Tags:</strong> {product.tags?.join(", ") || "No tags"}
        </p>
        <p>
          <strong>Brand:</strong> {product.brand_id || "No Brand"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(product.created_at).toLocaleDateString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(product.updated_at).toLocaleDateString()}
        </p>
        <div>
          <strong>Front Image:</strong>
          {product.product_front_image && (
            <img
              src={product.product_front_image.path}
              alt={product.product_front_image.alt}
              className="img-fluid"
            />
          )}
        </div>
        <div>
          <strong>Gallery Images:</strong>
          {product.product_image_gallery.map((img, index) => (
            <img
              key={index}
              src={img.path}
              alt={img.alt}
              className="img-fluid m-2"
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ProductDetailsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  product: PropTypes.object,
};

export default ProductDetailsModal;
