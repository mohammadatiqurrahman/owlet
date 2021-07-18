import React from "react";
import Loading from "../Loading";

const CollectionBanner = ({ bannerLoading, banner }) => {
  if (bannerLoading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <section>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <img
              src={
                banner ? banner : "/images/dummy-images/category-banner.jpeg"
              }
              alt="banner"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CollectionBanner;
