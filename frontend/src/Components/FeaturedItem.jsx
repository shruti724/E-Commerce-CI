import React from "react";

const FeaturedItem = ({ imgSrc, altText, text }) => {
  return (
    <div className="featured-item text-center">
      <img src={imgSrc} alt={altText} className="img-fluid mb-2" />
      <p>{text}</p>
    </div>
  );
};

export default FeaturedItem;
