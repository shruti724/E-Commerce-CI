import React from "react";
import PromotionsSection from "./PromotionsSection";
import CategoryNav from "./CategoryNav";
import SideAndSearchbar from "../Components/layouts/SideAndSearchbar";
import Footer from "../Components/layouts/Footer";
import Featured from "./Featured";


const LandingPage = () => {
  return (
    <>
      <div
        className="landing-page"
        style={{
          backgroundColor: "#FFC0CB",
          minHeight: "100vh",
          marginTop: "60px",
        }}
      >
        <SideAndSearchbar />
        <PromotionsSection />
<Featured/>
        <CategoryNav />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
