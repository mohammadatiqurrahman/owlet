import React from "react";

const Banner = ({ homePageBanner }) => {
  return (
    <section
      className="intro-section pb-6 mt-2"
      style={{ borderBottom: "none" }}
    >
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="custom-banner">
            {homePageBanner && <img src={homePageBanner} alt="banner" />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
