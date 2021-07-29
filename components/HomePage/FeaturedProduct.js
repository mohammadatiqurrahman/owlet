import Link from "next/link";
import React from "react";
import SingleProduct from "../SingleProduct";

const FeaturedProduct = ({ featuredProduct }) => {
  const featuredProductBanner = () => {
    return (
      <div
        className="col-lg-4 col-md-4 col-sm-12 mb-6 order-lg-last"
        data-animation-options="{'name': 'fadeInLeftShorter', 'delay': '.3s'}"
      >
        <div
          className="banner banner-fixed overlay-dark"
          style={{ backgroundColor: "#8ea9b2" }}
        >
          <Link href="/collections/featured">
            <figure>
              <img
                src="/images/baby/featuredbutton.png"
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

  const showFeaturedProducts = () => {
    return (
      <div className="col-lg-8 col-md-8">
        <div className="row">
          {featuredProduct.map((item) => {
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
    <section className="product-wrapper featured-products mt-10 pt-7 pb-8">
      <h2 className="title title-simple">Featured</h2>
      <div className="row">
        {featuredProductBanner()}
        {showFeaturedProducts()}
      </div>
    </section>
  );
};

export default FeaturedProduct;
