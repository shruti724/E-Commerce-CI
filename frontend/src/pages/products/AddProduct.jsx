import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/product/productSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import { loginUser } from "../../features/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

const AddProduct = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.product);
  const { user, isAunthicated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    price: "",
    categories: "",
    brand_id: "",
    product_front_image: {
      type: "",
      alt: "",
      path: "",
    },
    product_image_gallery: [
      {
        type: "",
        alt: "",
        path: "",
      },
    ],
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    discount_on_product: "",
    discount_type: "percentage",
    discounted_price: "",
    quantity: 1,
    is_indexed: true,
    is_in_stock: true,
    is_featured: false,
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageGalleryChange = (index, e) => {
    const { name, value } = e.target;
    const newGallery = formData.product_image_gallery.map((img, i) =>
      i === index ? { ...img, [name]: value } : img
    );
    setFormData({ ...formData, product_image_gallery: newGallery });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData))
      .unwrap()
      .then((response) => {
        toast.success("Product added successfully!");
        // Handle success (e.g., show a success message or redirect)
      })
      .catch((error) => {
        toast.error("Error adding product.");
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <>
      <SideAndSearchbar />
      <div className="pcoded-main-container">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h4>Add New Product</h4>
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
                  disabled={isLoading}
                  placeholder="Enter product title"
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
                  disabled={isLoading}
                  placeholder="Enter product slug"
                />
              </div>
              <div className="form-group">
                <label>Short Description</label>
                <input
                  type="text"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter short description"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter detailed description"
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter price"
                />
              </div>
              <div className="form-group">
                <label>Categories (comma-separated)</label>
                <input
                  type="text"
                  name="categories"
                  value={formData.categories}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter categories"
                />
              </div>
              <div className="form-group">
                <label>Brand ID</label>
                <input
                  type="text"
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter brand ID"
                />
              </div>
              <div className="form-group">
                <label>Front Image</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="product_front_image.type"
                    value={formData.product_front_image.type}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Type"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    name="product_front_image.alt"
                    value={formData.product_front_image.alt}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Alt"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    name="product_front_image.path"
                    value={formData.product_front_image.path}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Path"
                    disabled={isLoading}
                  />
                </div>
              </div>
              {formData.product_image_gallery.map((img, index) => (
                <div key={index} className="form-group">
                  <label>Gallery Image {index + 1}</label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      name="type"
                      value={img.type}
                      onChange={(e) => handleImageGalleryChange(index, e)}
                      className="form-control"
                      placeholder="Type"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      name="alt"
                      value={img.alt}
                      onChange={(e) => handleImageGalleryChange(index, e)}
                      className="form-control"
                      placeholder="Alt"
                      disabled={isLoading}
                    />
                    <input
                      type="text"
                      name="path"
                      value={img.path}
                      onChange={(e) => handleImageGalleryChange(index, e)}
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
                  disabled={isLoading}
                  placeholder="Enter meta title"
                />
              </div>
              <div className="form-group">
                <label>Meta Description</label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter meta description"
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
                  disabled={isLoading}
                  placeholder="Enter meta keywords"
                />
              </div>
              <div className="form-group">
                <label>Discount on Product</label>
                <input
                  type="text"
                  name="discount_on_product"
                  value={formData.discount_on_product}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter discount"
                />
              </div>
              <div className="form-group">
                <label>Discount Type</label>
                <select
                  name="discount_type"
                  value={formData.discount_type}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Discounted Price</label>
                <input
                  type="text"
                  name="discounted_price"
                  value={formData.discounted_price}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter discounted price"
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control"
                  disabled={isLoading}
                  placeholder="Enter quantity"
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
                <label>Is In Stock</label>
                <input
                  type="checkbox"
                  name="is_in_stock"
                  checked={formData.is_in_stock}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      is_in_stock: !prevData.is_in_stock,
                    }))
                  }
                  className="form-control"
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Is Featured</label>
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      is_featured: !prevData.is_featured,
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
                Add Product
              </button>
              {isError && <p className="text-danger">Failed to add product.</p>}
            </div>
          </div>
        </form>
      </div>

      {/* Toast Container for showing toasts */}
      <ToastContainer />
    </>
  );
};

export default AddProduct;
