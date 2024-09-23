import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../../features/category/categorySlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditCategoryModal from "./EditCategoryModal";
import Footer from "../../Components/layouts/Footer";
import "./Category.css"

function CategoriesList() {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.category);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle delete category
  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(categoryId));
    }
  };

  // Handle edit category
  const handleEdit = (category) => {
    setSelectedCategory(category);
  };

  // Handle close of EditCategoryModal
  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  // Filter categories based on the search query and status filter
  const filteredData = data.filter((category) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(searchLower) &&
      (statusFilter === "All" || category.status === statusFilter)
    );
  });

  // Display loading state
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Display error state
  if (isError) {
    return <h1>Error loading categories...</h1>;
  }

  return (
    <>
      <SideAndSearchbar />
      <main>
        <div className="col-xl-12 d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-header">
              <h5>Categories List</h5>
              <span className="d-block m-t-5">
                For admin only <code>table-category</code> inside ECOMMERCE
              </span>
            </div>
            <div className="card-body">
              {/* Filters and Search Bar */}
              <div className="d-flex justify-content-between mb-3">
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
                      statusFilter === "Active"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("Active")}
                    style={{ cursor: "pointer" }}
                  >
                    Active (
                    {
                      data.filter((category) => category.status === "Active")
                        .length
                    }
                    )
                  </span>
                  <span className="mx-2">|</span>
                  <span
                    className={
                      statusFilter === "Inactive"
                        ? "text-primary"
                        : "text-secondary"
                    }
                    onClick={() => setStatusFilter("Inactive")}
                    style={{ cursor: "pointer" }}
                  >
                    Inactive (
                    {
                      data.filter((category) => category.status === "Inactive")
                        .length
                    }
                    )
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control me-2"
                  />
                  <button className="btn btn-primary btn-sm">Search</button>
                </div>
              </div>

              {/* Categories Table */}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>S_no.</th>
                      <th>Category Id</th>
                      <th>Category Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData && filteredData.length > 0 ? (
                      filteredData.map((category, index) => (
                        <tr key={category._id}>
                          <td>{index + 1}</td>
                          <td>{category._id}</td>
                          <td>{category.title}</td>
                          <td>{category.description}</td>
                          <td>{category.status}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEdit(category)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger ms-2"
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No categories available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onUpdate={() => dispatch(fetchCategories())}
          onCancel={handleCloseModal}
        />
      )}
      <Footer />
    </>
  );
}

export default CategoriesList;
