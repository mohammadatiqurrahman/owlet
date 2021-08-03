import Link from "next/link";
import React from "react";

const Category = () => {
  return (
    <section className="banner-group pb-10">
      <div className="row">
        <div className="col-md-6 mb-4">
          <Link href="/collections/baby-boy">
            <div
              className="banner banner-fixed overlay-dark"
              data-animation-options="{'name': 'fadeInRightShorter', 'delay': '.1s'}"
              style={{ backgroundColor: "#eff0f4" }}
            >
              <figure>
                <img
                  src="/images/baby/hcpu1text.png"
                  alt="banner"
                  width="580"
                  height="380"
                />
              </figure>
            </div>
          </Link>
        </div>
        <div className="col-md-6 mb-4">
          <div
            className="banner banner-fixed overlay-dark"
            data-animation-options="{'name': 'fadeInLeftShorter', 'delay': '.2s'}"
            style={{ backgroundColor: "#eff0f4" }}
          >
            <figure>
              <img
                src="/images/baby/hcpu2.png"
                alt="banner"
                width="580"
                height="380"
              />
            </figure>
            <div className="banner-content y-50 w-100">
              <h4 className="banner-subtitle ls-normal text-uppercase font-weight-normal">
                Fragrance offers
              </h4>
              <h3 className="banner-title mb-5 text-uppercase">
                For Men’s Collection
                <span className="d-block font-weight-normal ls-m text-body">
                  Sale Up to <b className="ls-normal">70% off</b>
                </span>
              </h3>
              {/* <Link
                href="/collections/baby-girl"
                className="btn btn-md btn-solid btn-rounded"
              >
                <span>
                  Shop now<i className="d-icon-arrow-right"></i>
                </span>
              </Link> */}
              <a class="btn btn-md btn-solid btn-rounded">
                <Link href="/collections/baby-girl">
                  <span>
                    Shop now<i className="d-icon-arrow-right"></i>
                  </span>
                </Link>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="categories owl-carousel owl-nav-full owl-theme row cols-lg-3 cols-sm-2 cols-1 mb-4"
        data-animation-options="{'name': 'fadeInUpShorter', 'delay': '.4s'}"
        data-owl-options="{
                            'items': 3,
                            'margin': 20,
                            'dots': false,
                            'autoplay': true,
                            'responsive': {
                                '0': {
                                    'items': 1
                                },
                                '576': {
                                    'items': 2
                                },
                                '992': {
                                    'items': 3
                                }
                            }
                        }"
      >
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
