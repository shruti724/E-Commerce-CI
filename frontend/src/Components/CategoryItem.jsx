import React from "react";
import { NavLink } from "react-router-dom";

const CategoryItem = ({ imgSrc, altText, text, path }) => {
  return (
    <NavLink to={path} className="category-item text-center">
      <img src={imgSrc} alt={altText} className="img-fluid w-75 rounded" />
      <p>{text}</p>
    </NavLink>
  );
};

export default CategoryItem;
