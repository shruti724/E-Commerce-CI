import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  bulkDelete, 
} from "../../features/product/productSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditProductModal from "./EditProductModal";
import { fetchCategories } from "../../features/category/categorySlice";
import { fetchBrands } from "../../features/brand/brandSlice";
// import Pagination from "../../Components/Pagination";

function ProductsList() {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector(
    (state) => state.product
  );
  const categories = useSelector((state) => state.category.data);
  const brands = useSelector((state) => state.brand.data);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState([]); 
  const [bulkAction, setBulkAction] = useState(""); 
  const [page, setPage] = useState(1); 
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;
  

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }));
    dispatch(fetchCategories());
    dispatch(fetchBrands());
    
    
  }, [dispatch, page, limit]);

  

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleBulkDelete = () => {
    if (
      window.confirm("Are you sure you want to delete the selected products?")
    ) {
      dispatch(bulkDelete(selectedProducts));
      setSelectedProducts([]);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleNextPage = () => {
    console.log("is clicked", pages)
    if (page < pages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

   const handlePageChange = (page) => {
     if (page >= 1 && page <= totalPages) {
       setCurrentPage(page);
     }
   };

   console.log("data: ", data)
  const filteredData = data
    .filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (product.title.toLowerCase().includes(searchLower) ||
          product._id.toLowerCase().includes(searchLower)) &&
        (selectedCategory ? product.category === selectedCategory : true) &&
        (selectedBrand ? product.brand === selectedBrand : true) &&
        (statusFilter === "All" || product.status === statusFilter)
      );
    })
    .sort((a, b) => {
      if (sortOption === "A-Z") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "Z-A") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading products...</h1>;
  }

  return (
    <>
      <SideAndSearchbar />
      <main>
        <div className="col-xl-12 d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-header">
              <h5>Products List</h5>
              <span className="d-block m-t-5">
                For admin only <code>table-product</code> inside ECOMMERCE
              </span>
            </div>
            <div className="card-body">
              <div className="status-filter d-flex justify-content-between">
                <div>
                  <span
                    className={
                      statusFilter === "All" ? "text-primary" : "text-secondary"
                    }
                    onClick={() => setStatusFilter("All")}
                    style={{ cursor: "pointer" }}
                  >
                    All ({data.length})
                  </span>
                  <span className="mx-2">|</span>
                  <span
                    className={
                      statusFilter === "Published"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("Published")}
                    style={{ cursor: "pointer" }}
                  >
                    Published (
                    {data.filter((p) => p.status === "active").length})
                  </span>
                  <span className="mx-2">|</span>
                  <span
                    className={
                      statusFilter === "Featured"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("Featured")}
                    style={{ cursor: "pointer" }}
                  >
                    Featured ({data.length})
                  </span>
                  <span className="mx-2">|</span>
                  <span
                    className={
                      statusFilter === "Soft Deleted"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("Soft Deleted")}
                    style={{ cursor: "pointer" }}
                  >
                    Soft Deleted (
                    {data.filter((p) => p.isDeleted === true).length})
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <span className="mx-2">
                    <input
                      type="text"
                      placeholder="Search by name or ID"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control me-2"
                    />
                  </span>
                  <button type="button" className="btn btn-primary btn-sm">
                    Search
                  </button>
                </div>
              </div>
              <div>
                <span>
                  <select
                    className="form-select me-2"
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                  >
                    <option value="">Bulk actions</option>
                    <option value="bulk-inStock">Bulk In Stock</option>
                    <option value="bulk-outStock">Bulk Out Stock</option>
                    <option value="bulk-delete">Bulk Delete</option>
                  </select>
                </span>
                <span className="mx-1">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={
                      bulkAction === "bulk-delete" ? handleBulkDelete : null
                    }
                  >
                    Apply
                  </button>
                </span>
              </div>

              <div className="d-flex mb-3">
                <span>
                  <select
                    className="form-select me-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title} ({category.productCount || 0})
                      </option>
                    ))}
                  </select>
                </span>
                <span className="mx-1">
                  <select
                    className="form-select me-2"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                  >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.title}
                      </option>
                    ))}
                  </select>
                </span>
                <span className="mx-1">
                  <select className="form-select me-2" value={sortOption}>
                    <option value="">Filter by stock</option>
                    <option value="In Stock">In stock</option>
                    <option value="Stock out">Stock out</option>
                  </select>
                </span>

                <button type="btn" className="btn btn-success btn-sm">
                  Filter
                </button>
                <span className="d-flex justify-content-end">
                  <select
                    className="form-select me-2"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">Sort By</option>
                    <option value="A-Z">Name A-Z</option>
                    <option value="Z-A">Name Z-A</option>
                  </select>
                </span>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>S_no.</th>
                      <th>Product Id</th>
                      <th>Product Name</th>
                      <th>Price(₹)</th>
                      <th>Quantity</th>
                      <th>Categories</th>
                      <th>Tags</th>
                      <th>Last Modified</th>
                      <th>Brand</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((product, index) => (
                        <tr key={product._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product._id)}
                              onChange={() => handleSelectProduct(product._id)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{product._id}</td>
                          <td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>
                            {product.categories?.join(", ") || "No categories"}
                          </td>
                          <td>{product.tags?.join(", ") || "No tags"}</td>
                          <td>
                            {new Date(product.updated_at).toLocaleDateString()}
                          </td>
                          <td>{product ? product.brand_id : "No Brand"}</td>
                          <td className="d-flex align-items-center">
                            <button
                              className="btn btn-icon"
                              onClick={() => handleEdit(product)}
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              className="btn btn-icon"
                              onClick={() => handleEdit(product)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-icon text-danger ms-2"
                              onClick={() => handleDelete(product._id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="11" className="text-center">
                          No products available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        /> */}
              </div>
              <div className="pagination-button d-flex justify-content-center align-items-center my-4">
                <span className="me-2">
                  <a
                    className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-between"
                    onClick={handlePreviousPage}
                  >
                    <i className="fa fa-arrow-left ms-2"></i>
                    Previous
                  </a>
                </span>
                <span>
                  Page {page} of {pages}
                </span>
                <span>
                  <a
                    className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-between"
                    onClick={handleNextPage}
                  >
                    Next
                    <i className="fa fa-arrow-right mx-2"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default ProductsList;
