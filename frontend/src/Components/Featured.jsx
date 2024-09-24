import React from "react";
import FeaturedItem from "./FeaturedItem"; // Make sure to create this component

const Featured = () => {
  return (
    <div className="featured-section">
      <h2 className="text-center">Featured Items</h2>
      <div className="featured-items d-flex justify-content-between">
        <FeaturedItem
          imgSrc="/assets/images/bag.jpg" // Replace with the actual image path
          altText="Featured Item 1"
          text="Item 1 Description"
        />
        <FeaturedItem
          imgSrc="/assets/images/bag.jpg" // Replace with the actual image path
          altText="Featured Item 2"
          text="Item 2 Description"
        />
        <FeaturedItem
          imgSrc="/assets/images/bag.jpg" // Replace with the actual image path
          altText="Featured Item 3"
          text="Item 3 Description"
        />
        <FeaturedItem
          imgSrc="/assets/images/bag.jpg" // Replace with the actual image path
          altText="Featured Item 4"
          text="Item 4 Description"
        />
      </div>
      <div className="d-flex justify-content-center ">
        <button className="btn btn-dark">View All Featured Items</button>
      </div>
    </div>
  );
};

export default Featured;
