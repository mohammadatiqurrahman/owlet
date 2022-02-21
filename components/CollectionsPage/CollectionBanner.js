import React from "react";

const CollectionBanner = ({ banner }) => {
  return (
    <React.Fragment>
      <section>
        <div className="row">
          <div className="col-lg-12 mb-4">
            {banner ? (
              <img
                src={banner}
                alt="banner"
                style={{ height: "302px", width: "100%" }}
              />
            ) : (
              ""
            )}
            {/* // If Image is not available it will show default imgage Start */}
            {/* <img
              src={
                banner ? banner : "/images/dummy-images/category-banner.jpeg"
              }
              alt="banner"
              style={{ height: "302px", width: "100%" }}
            /> */}
            {/* // If Image is not available it will show default imgage End */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CollectionBanner;
