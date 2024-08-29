import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../../features/category/categorySlice"; // Adjust the import based on your actual path
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditCategoryModal from "./EditCategoryModal"; // Create this component similarly to EditProductModal

function CategoriesList() {
  const dispatch = useDispatch();
  const { isLoading, data, isError } = useSelector((state) => state.category);
  const searchQuery = useSelector((state) => state.search.query); // Get the search query from Redux
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  // Filter categories based on the search query
  const filteredData = data.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="pcoded-main-container">
        <div className="col-xl-12 d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-header">
              <h5>Categories List</h5>
              <span className="d-block m-t-5">
                For admin only <code>table-category</code> inside ECOMMERCE
              </span>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>S_no.</th>
                      <th>Category Id</th>
                      <th>Category Name</th>
                      <th>Description</th>
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
                        <td colSpan="5" className="text-center">
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
      </div>
      {selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onUpdate={() => dispatch(fetchCategories())}
          onCancel={handleCloseModal}
        />
      )}
    </>
  );
}

export default CategoriesList;
