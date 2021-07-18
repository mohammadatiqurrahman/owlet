import { Link } from "@material-ui/core";
import React, { useState } from "react";
import SingleProduct from "../SingleProduct";

const NewArrival = ({ newArrival }) => {
  const newArrivalBanner = () => {
    return (
      <div
        className="col-lg-4 col-md-4 col-sm-12 mb-6"
        data-animation-options="{'name': 'fadeInRightShorter', 'delay': '.5s'}"
      >
        <div
          className="banner banner-fixed overlay-dark"
          style={{ backgroundColor: "#2f2f2f" }}
        >
          <figure>
            <img
              src="/images/baby/featured.png"
              alt="banner"
              width="380"
              height="705"
            />
          </figure>
          <div className="banner-content">
            <h4 className="banner-subtitle ls-s font-weight-normal">
              Featured
            </h4>
            <h3 className="banner-title ls-m text-uppercase font-weight-bold">
              New Lifestyle
              <span className="d-block ls-s text-normal">Collection</span>
            </h3>
            <Link href={`/collections/new_arrival`}>
              <span
                className="btn btn-sm btn-solid btn-rounded shop-now"
                style={{ backgroundColor: "#2b6777", color: "white" }}
              >
                Shop now
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const shwoNewArrivalProducts = () => {
    return (
      <div className="col-lg-8 col-md-8">
        <div className="row">
          {newArrival.map((item) => {
            return (
              <div
                key={item.id}
                className="col-md-4 col-6"
                data-animation-options="{'name': 'fadeInUpShorter', 'delay': '.2s'}"
              >
                <SingleProduct item={item} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <section className="product-wrapper best-products mt-10 pt-7 pb-8">
      <h2 className="title title-simple">New Arrival</h2>
      <div className="row">
        {newArrivalBanner()}
        {shwoNewArrivalProducts()}
      </div>
    </section>
  );
};

export default NewArrival;
