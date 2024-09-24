import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../features/category/categorySlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // For redirection
import Footer from "../../Components/layouts/Footer";


const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // To handle redirection

  const { isLoading, isError } = useSelector((state) => state.category);



  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    parent_id: "",
    category_front_image: {
      type: "",
      alt: "",
      path: "",
    },
    category_image_gallery: [
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGalleryChange = (index, e) => {
    const { name, value } = e.target;
    const newGallery = formData.category_image_gallery.map((img, i) =>
      i === index ? { ...img, [name]: value } : img
    );
    setFormData({ ...formData, category_image_gallery: newGallery });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory(formData))
      .unwrap()
      .then(() => {
        toast.success("Category added successfully!");
      })
      .catch(() => {
        toast.error("Error adding category.");
      });
  };

  return (
    <>
      <SideAndSearchbar />
      <div className="col-xl-12 d-flex justify-content-center mt-5">
        <div className="card my-4">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h4>Add New Category</h4>
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
                    placeholder="Enter category title"
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
                    placeholder="Enter category slug"
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Parent ID</label>
                  <input
                    type="text"
                    name="parent_id"
                    value={formData.parent_id}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter parent category ID"
                    disabled={isLoading}
                  />
                </div>
                <div className="form-group">
                  <label>Front Image</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      name="category_front_image.type"
                      value={formData.category_front_image.type}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Type"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      name="category_front_image.alt"
                      value={formData.category_front_image.alt}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Alt"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      name="category_front_image.path"
                      value={formData.category_front_image.path}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Path"
                      disabled={isLoading}
                    />
                  </div>
                </div>
                {formData.category_image_gallery.map((img, index) => (
                  <div key={index} className="form-group">
                    <label>Gallery Image {index + 1}</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        name="type"
                        value={img.type}
                        onChange={(e) => handleGalleryChange(index, e)}
                        className="form-control"
                        placeholder="Type"
                        disabled={isLoading}
                      />
                      <input
                        type="text"
                        name="alt"
                        value={img.alt}
                        onChange={(e) => handleGalleryChange(index, e)}
                        className="form-control"
                        placeholder="Alt"
                        disabled={isLoading}
                      />
                      <input
                        type="text"
                        name="path"
                        value={img.path}
                        onChange={(e) => handleGalleryChange(index, e)}
                        className="form-control"
                        placeholder="Path"
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  Add Category
                </button>
                {isError && (
                  <p className="text-danger">Failed to add category.</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
<Footer/>
      <ToastContainer />
    </>
  );
};

export default AddCategory;