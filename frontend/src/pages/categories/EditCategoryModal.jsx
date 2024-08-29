// Components/EditCategoryModal.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../features/category/categorySlice"; // Update with correct path

const EditCategoryModal = ({ category, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title,
        description: category.description,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ ...category, ...formData })).then(() => {
      onUpdate();
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Category Name</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;
