// src/components/brands/EditBrandModal.js
import React, { useState, useEffect } from "react";

const EditBrandModal = ({ brand, onUpdate, onCancel }) => {
  const [brandName, setBrandName] = useState("");

  useEffect(() => {
    if (brand) {
      setBrandName(brand.name);
    }
  }, [brand]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({ ...brand, name: brandName });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>
          &times;
        </span>
        <h2>Edit Brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="brandName">Brand Name</label>
            <input
              type="text"
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBrandModal;
