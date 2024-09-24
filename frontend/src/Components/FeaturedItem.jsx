import React from "react";

const FeaturedItem = ({ imgSrc, altText, text }) => {
  return (
    <div className="featured-item">
      <img src={imgSrc} alt={altText} className="img-fluid" />
      <p className="text-center">{text}</p>
    </div>
  );
};

export default FeaturedItem;
