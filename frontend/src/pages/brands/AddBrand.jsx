import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBrand } from "../../features/brand/brandSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBrand = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.brand);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    brand_front_image: {
      type: "",
      alt: "",
      path: "",
    },
    brand_image_gallery: [
      {
        type: "",
        alt: "",
        path: "",
      },
    ],
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    is_indexed: true,
    status: "active",
    isDeleted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name.includes("brand_front_image") ||
      name.includes("brand_image_gallery")
    ) {
      // Handle nested fields
      const [parent, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleGalleryChange = (index, e) => {
    const { name, value } = e.target;
    const newGallery = formData.brand_image_gallery.map((img, i) =>
      i === index ? { ...img, [name]: value } : img
    );
    setFormData({ ...formData, brand_image_gallery: newGallery });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBrand(formData))
      .unwrap()
      .then(() => {
        toast.success("Brand added successfully!");
      })
      .catch(() => {
        toast.error("Error adding brand.");
      });
  };

  return (
    <>
      <SideAndSearchbar />
      <div className="pcoded-main-container">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h4>Add New Brand</h4>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter brand title"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Slug</label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter brand slug"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Front Image</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="brand_front_image.type"
                    value={formData.brand_front_image.type}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Image Type"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    name="brand_front_image.alt"
                    value={formData.brand_front_image.alt}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Alt Text"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    name="brand_front_image.path"
                    value={formData.brand_front_image.path}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Image Path"
                    disabled={isLoading}
                  />
                </div>
              </div>
              {formData.brand_image_gallery.map((img, index) => (
                <div key={index} className="form-group">
                  <label>Gallery Image {index + 1}</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      name="type"
                      value={img.type}
                      onChange={(e) => handleGalleryChange(index, e)}
                      className="form-control"
                      placeholder="Image Type"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      name="alt"
                      value={img.alt}
                      onChange={(e) => handleGalleryChange(index, e)}
                      className="form-control"
                      placeholder="Alt Text"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      name="path"
                      value={img.path}
                      onChange={(e) => handleGalleryChange(index, e)}
                      className="form-control"
                      placeholder="Image Path"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              ))}
              <div className="form-group">
                <label>Meta Title</label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter meta title"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Meta Description</label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter meta description"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Meta Keywords</label>
                <input
                  type="text"
                  name="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter meta keywords"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Is Indexed</label>
                <input
                  type="checkbox"
                  name="is_indexed"
                  checked={formData.is_indexed}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      is_indexed: !prevData.is_indexed,
                    }))
                  }
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label>Is Deleted</label>
                <input
                  type="checkbox"
                  name="isDeleted"
                  checked={formData.isDeleted}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      isDeleted: !prevData.isDeleted,
                    }))
                  }
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                Add Brand
              </button>
              {isError && <p className="text-danger">Failed to add brand.</p>}
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default AddBrand;
