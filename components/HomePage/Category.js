import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <section className="banner-group pb-10 mt-1">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="banner banner-fixed overlay-dark"
            data-animation-options="{'name': 'fadeInRightShorter', 'delay': '.1s'}"
            style={{ backgroundColor: "#eff0f4", cursor: "pointer" }}
          >
            <Link href="/collections/baby-boy">
              <figure>
                <img
                  src="/images/baby/hcpu1text.png"
                  alt="banner"
                  width="580"
                  height="380"
                />
              </figure>
            </Link>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="banner banner-fixed overlay-dark"
            data-animation-options="{'name': 'fadeInLeftShorter', 'delay': '.2s'}"
            style={{ backgroundColor: "#eff0f4", cursor: "pointer" }}
          >
            <Link href="/collections/baby-girl">
              <figure>
                <img
                  src="/images/baby/hcpu2.jpeg"
                  alt="banner"
                  width="580"
                  height="380"
                />
              </figure>
            </Link>
          </div>
        </div>
      </div>
      <div className="categories owl-carousel owl-nav-full owl-theme row cols-lg-3 cols-sm-2 cols-1 mb-4">
        <div className="category">
          <Link href="/collections/baby-boy">
            <figure className="category-media">
              <img
                src="/images/baby/hcp1.png"
                alt="category"
                width="280"
                height="280"
              />
            </figure>
          </Link>
          <div className="category-content">
            <h4 className="category-name text-uppercase">
              <Link href="/collections/baby-boy">Baby Boy</Link>
            </h4>
            <span className="category-count">
              <span>35</span> Products
            </span>
          </div>
        </div>
        <div className="category">
          <Link href="/collections/baby-girl">
            <figure className="category-media">
              <img
                src="/images/baby/hcp2.png"
                alt="category"
                width="280"
                height="280"
              />
            </figure>
          </Link>
          <div className="category-content">
            <h4 className="category-name text-uppercase">
              <Link href="/collections/baby-girl">Baby Girl</Link>
            </h4>
            <span className="category-count">
              <span>47</span> Products
            </span>
          </div>
        </div>
        <div className="category">
          <Link href="/collections/baby-boy">
            <figure className="category-media">
              <img
                src="/images/baby/hcp3.png"
                alt="category"
                width="280"
                height="280"
              />
            </figure>
          </Link>
          <div className="category-content">
            <h4 className="category-name text-uppercase">
              <Link href="/collections/baby-boy">Toddler Boy</Link>
            </h4>
            <span className="category-count">
              <span>29</span> Products
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
