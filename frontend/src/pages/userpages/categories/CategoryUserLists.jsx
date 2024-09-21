import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../features/userfeatures/category/categoryUserSlice";
import { Link } from "react-router-dom";
import SideAndSearchbar from "../../../Components/layouts/SideAndSearchbar";
import Footer from "../../../Components/layouts/Footer";
import "./CategoryUserLists.css"

const CategoryUserLists = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categoryUser
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <SideAndSearchbar />
      <div>
        <main className="flex-grow-1 overflow-auto">
          <h2 className="my-4 mx-4">Categories List</h2>
          {categories && categories.length === 0 ? (
            <div className="row">
              <div className="col-12">
                <div className="card mx-4" style={{ width: "18rem" }}>
                  <img
                    className="card-img-top"
                    src="/assets/images/bag.jpg"
                    alt="Empty Categories"
                  />
                  <div className="card-body">
                    <h5 className="card-title">No categories available!</h5>
                    <p className="card-text">
                      Browse our products and explore new categories.
                    </p>
                    <Link to="/products">
                      <button className="btn btn-primary">
                        Explore Products
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              {categories.map((category) => (
                <div key={category._id} className="col-md-3 mb-4">
                  <div className="card" style={{ width: "100%" }}>
                    <img
                      src={
                        category.category_front_image?.path ||
                        "/assets/images/bag.jpg"
                      }
                      alt={category.category_front_image?.alt || category.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h3 className="card-title">{category.title}</h3>
                      <p className="card-text">{category.meta_description}</p>
                      <span>
                        <Link to={`/category/${category._id}`}>
                          <button className="btn btn-info btn-sm">
                            View Details
                          </button>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryUserLists;
