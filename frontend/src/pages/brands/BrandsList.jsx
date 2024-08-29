import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrands, deleteBrand } from "../../features/brand/brandSlice";
import SideAndSearchbar from "../../Components/layouts/SideAndSearchbar";
import EditBrandModal from "./EditBrandModal";
import BrandDetailsModal from "./BandDetailsModal";

const BrandsList = () => {
  const dispatch = useDispatch();
  const {
    data: brands,
    isLoading,
    isError,
  } = useSelector((state) => state.brand);
  const [selectedBrand, setSelectedBrand] = React.useState(null); // State to handle the selected brand for editing
  const [showModal, setShowModal] = React.useState(false); // State to control modal visibility for editing
  const [showDetails, setShowDetails] = React.useState(false); // State to control modal visibility for viewing
  const [error, setError] = React.useState(null);

  const searchQuery = useSelector((state) => state.search.query); // Get the search query from the Redux store

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }

    dispatch(fetchBrands());
  }, [dispatch]);

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBrand(null); // Clear the selected brand
  };

  const handleUpdate = async (updatedBrand) => {
    try {
      // Handle brand update logic
      // dispatch(updateBrand(updatedBrand));
      handleCloseModal(); // Close the modal after update
    } catch (error) {
      console.error("Error updating brand:", error);
    }
  };

  const handleDelete = async (brandId) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        await dispatch(deleteBrand(brandId));
        console.log("Brand deleted successfully.");
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  const handleView = (brand) => {
    setSelectedBrand(brand);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedBrand(null); 
  };

  // Filter the brands based on the search query
  const filteredBrands = brands.filter((brand) => {
    return (
      brand.title &&
      typeof brand.title === "string" &&
      brand.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="error-message">
        An error occurred while fetching brands.
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <SideAndSearchbar />
      <div className="pcoded-main-container">
        <div className="col-xl-12 d-flex justify-content-center mt-5">
          <div className="card">
            <div className="card-header">
              <h5>Brands Table</h5>
              <span className="d-block m-t-5">
                For admin only <code>table-brand</code> inside ECOMMERCE
              </span>
            </div>
            <div className="card-body table-border-style">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>S_no.</th>
                      <th>Brand Id</th>
                      <th>Brand Name</th>
                      <th>Actions</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.length > 0 ? (
                      filteredBrands.map((brand, index) => (
                        <tr key={brand._id}>
                          <td>{index + 1}</td>
                          <td>{brand._id}</td>
                          <td>{brand.title}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleView(brand)} // View button click handler
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <i
                              className="feather icon-edit"
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => handleEdit(brand)}
                            />
                          </td>
                          <td>
                            <i
                              className="feather icon-delete"
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => handleDelete(brand._id)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No brands available.
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
      {showModal && (
        <EditBrandModal
          brand={selectedBrand}
          onUpdate={handleUpdate}
          onCancel={handleCloseModal}
        />
      )}
      {showDetails && (
        <BrandDetailsModal brand={selectedBrand} onClose={handleCloseDetails} />
      )}
    </>
  );
};

export default BrandsList;
