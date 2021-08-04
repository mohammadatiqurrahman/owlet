import Link from "next/link";
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
          style={{ backgroundColor: "#2f2f2f", cursor: "pointer" }}
        >
          <Link href="/collections/new_arrival">
            <figure>
              <img
                src="/images/baby/featured.jpeg"
                alt="banner"
                width="380"
                height="705"
              />
            </figure>
          </Link>
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
