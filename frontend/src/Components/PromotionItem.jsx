// PromotionItem.jsx
import React from "react";

const PromotionItem = ({ imgSrc, altText, text }) => {
  return (
    <div className="promotion-item text-center">
      <img
        src={imgSrc}
        alt={altText}
        className="img-fluid rounded-circle w-75 my-3"
      />
      <p>{text}</p>
    </div>
  );
};

export default PromotionItem;
