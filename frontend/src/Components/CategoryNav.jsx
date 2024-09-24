import React from "react";
import CategoryItem from "./CategoryItem"; // Import a separate component for each category

const CategoryNav = () => {
  return (
    <div className="category-nav">
      <div className="d-flex justify-content-between mt-3">
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" 
          altText="Electronics"
          text="Electronics"
          path="/electronics"
        />
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" // Replace with actual image path
          altText="Fashion"
          text="Fashion"
          path="/fashion"
        />
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" // Replace with actual image path
          altText="Beauty"
          text="Beauty"
          path="/beauty"
        />
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" // Replace with actual image path
          altText="Sports"
          text="Sports"
          path="/sports"
        />
      </div>
      <div className="d-flex justify-content-between">
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" // Replace with actual image path
          altText="Electronics"
          text="Electronics"
          path="/electronics"
        />
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" // Replace with actual image path
          altText="Fashion"
          text="Fashion"
          path="/fashion"
        />
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" // Replace with actual image path
          altText="Beauty"
          text="Beauty"
          path="/beauty"
        />
        <CategoryItem
          imgSrc="/assets/images/bag.jpg" // Replace with actual image path
          altText="Sports"
          text="Sports"
          path="/sports"
        />
      </div>
      <div className="d-flex justify-content-center ">
        <button className="btn btn-dark">View All Categories</button>
      </div>
    </div>
  );
};

export default CategoryNav;
