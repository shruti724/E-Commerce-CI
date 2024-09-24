import React from "react";
// import FeaturedItem from "./FeaturedItem"; // Make sure to create this component

const Featured = () => {
  return (
    <div className="featured-section">
      <h2 className="text-center">Featured Items</h2>

      {/* Carousel Component */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="/assets/images/slider/img-slide-1.jpg"
              alt="First slide"
            />{" "}
            {/* Replace with actual image */}
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="/assets/images/slider/img-slide-2.jpg"
              alt="Second slide"
            />{" "}
            {/* Replace with actual image */}
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="/assets/images/slider/img-slide-3.jpg"
              alt="Third slide"
            />{" "}
            {/* Replace with actual image */}
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Featured;
