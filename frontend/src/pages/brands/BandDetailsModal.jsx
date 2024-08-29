import React from "react";
import PropTypes from "prop-types";

const BrandDetailsModal = ({ brand, onClose }) => {
  if (!brand) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050, // Ensure it's above other elements
      }}
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          maxWidth: "90%", // Adjusted for responsiveness
          width: "600px", // Default width
          maxHeight: "80%",
          overflowY: "auto",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative", // Ensure proper alignment
        }}
      >
        <div
          className="modal-header"
          style={{
            padding: "15px",
            backgroundColor: "#f1f1f1",
            borderBottom: "1px solid #ddd",
          }}
        >
          <h5 className="modal-title">Brand Details</h5>
          <button
            type="button"
            className="close"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5em",
              cursor: "pointer",
              position: "absolute",
              top: "15px",
              right: "15px",
            }}
          >
            &times;
          </button>
        </div>
        <div
          className="modal-body"
          style={{ padding: "15px", overflowY: "auto" }}
        >
          <table className="table table-striped" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>ID</th>
                <td>{brand._id}</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>{brand.title}</td>
              </tr>
              <tr>
                <th>Slug</th>
                <td>{brand.slug}</td>
              </tr>
              <tr>
                <th>Meta Title</th>
                <td>{brand.meta_title}</td>
              </tr>
              <tr>
                <th>Meta Description</th>
                <td>{brand.meta_description}</td>
              </tr>
              <tr>
                <th>Meta Keywords</th>
                <td>{brand.meta_keywords}</td>
              </tr>
              <tr>
                <th>Brand Front Image</th>
                <td>
                  {brand.brand_front_image ? (
                    <img
                      src={brand.brand_front_image.path}
                      alt={brand.brand_front_image.alt}
                      style={{ width: "100px" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
              <tr>
                <th>Brand Image Gallery</th>
                <td>
                  {brand.brand_image_gallery.length > 0 ? (
                    <ul style={{ padding: 0, listStyleType: "none" }}>
                      {brand.brand_image_gallery.map((image, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                          <img
                            src={image.path}
                            alt={image.alt}
                            style={{ width: "100px" }}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No Images"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="modal-footer"
          style={{
            padding: "15px",
            backgroundColor: "#f1f1f1",
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

BrandDetailsModal.propTypes = {
  brand: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default BrandDetailsModal;
