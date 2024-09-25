import React from "react";
import PromotionItem from "./PromotionItem";

const PromotionsSection = () => {
  return (
    <div className="promotions-section">
      <div className="deals d-flex justify-content-between">
        <PromotionItem
          imgSrc="/assets/images/bag.jpg"
          altText="Curtain Raiser"
          text="Curtain Raiser"
        />
        <PromotionItem
          imgSrc="/assets/images/bag.jpg"
          altText="Price Crash"
          text="Price Crash"
        />
        <PromotionItem
          imgSrc="/assets/images/bag.jpg"
          altText="Sale"
          text="Sale Today"
        />
        <PromotionItem
          imgSrc="/assets/images/bag.jpg"
          altText="Sale"
          text="Sale Today"
        />
      </div>
      {/* <div className="d-flex justify-content-center">
        <button className="btn btn-dark d-flex justify-content-center">
          Explore All Deals
        </button>
      </div> */}
    </div>
  );
};

export default PromotionsSection;
