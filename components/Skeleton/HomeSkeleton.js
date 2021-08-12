import React from "react";
import ContentLoader, { Facebook } from "react-content-loader";
import Link from "next/link";
const HomeSkeleton = () => {
  return (
    <React.Fragment>
      <main className="main home">
        <div className="page-content">
          <div className="container">
            <section
              className="intro-section pb-6 mt-2"
              style={{ borderBottom: "none" }}
            >
              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div className="custom-banner">
                    <ContentLoader viewBox="0 0 380 180">
                      {/* Only SVG shapes */}
                      <rect
                        x="0"
                        y="0"
                        rx="5"
                        ry="5"
                        width="100%"
                        height="165"
                      />
                    </ContentLoader>
                    <section className="banner-group pb-10">
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="banner banner-fixed overlay-dark">
                            <Link href="/collections/baby-boy">
                              <figure>
                                <ContentLoader viewBox="0 0 380 250">
                                  {/* Only SVG shapes */}
                                  <rect
                                    x="0"
                                    y="0"
                                    rx="5"
                                    ry="5"
                                    width="100%"
                                    height="250"
                                  />
                                </ContentLoader>
                              </figure>
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="banner banner-fixed overlay-dark">
                            <Link href="/collections/baby-girl">
                              <figure>
                                <ContentLoader viewBox="0 0 380 250">
                                  {/* Only SVG shapes */}
                                  <rect
                                    x="0"
                                    y="0"
                                    rx="5"
                                    ry="5"
                                    width="100%"
                                    height="250"
                                  />
                                </ContentLoader>
                              </figure>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="categories owl-carousel owl-nav-full owl-theme row cols-lg-3 cols-sm-2 cols-1 mb-4">
                        <div className="category">
                          <Link href="/collections/baby-boy">
                            <figure className="category-media">
                              <ContentLoader viewBox="0 0 380 250">
                                {/* Only SVG shapes */}
                                <rect
                                  x="0"
                                  y="0"
                                  rx="5"
                                  ry="5"
                                  width="100%"
                                  height="250"
                                />
                              </ContentLoader>
                            </figure>
                          </Link>
                        </div>
                        <div className="category">
                          <Link href="/collections/baby-girl">
                            <figure className="category-media">
                              <ContentLoader viewBox="0 0 380 250">
                                {/* Only SVG shapes */}
                                <rect
                                  x="0"
                                  y="0"
                                  rx="5"
                                  ry="5"
                                  width="100%"
                                  height="250"
                                />
                              </ContentLoader>
                            </figure>
                          </Link>
                        </div>
                        <div className="category">
                          <Link href="/collections/baby-boy">
                            <figure className="category-media">
                              <ContentLoader viewBox="0 0 380 250">
                                {/* Only SVG shapes */}
                                <rect
                                  x="0"
                                  y="0"
                                  rx="5"
                                  ry="5"
                                  width="100%"
                                  height="250"
                                />
                              </ContentLoader>
                            </figure>
                          </Link>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
            <section className="product-wrapper best-products  pb-8">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 mb-6">
                  <div className="banner banner-fixed overlay-dark">
                    <Link href="/collections/new_arrival">
                      <figure>
                        <ContentLoader viewBox="0 0 380 480">
                          {/* Only SVG shapes */}
                          <rect
                            x="0"
                            y="0"
                            rx="5"
                            ry="5"
                            width="100%"
                            height="480"
                          />
                        </ContentLoader>
                      </figure>
                    </Link>
                  </div>
                </div>
                <div className="col-lg-8 col-md-8">
                  <div className="row">
                    <div className="col-md-4 col-6">
                      <ContentLoader viewBox="0 0 380 320">
                        {/* Only SVG shapes */}
                        <rect
                          x="0"
                          y="0"
                          rx="5"
                          ry="5"
                          width="100%"
                          height="280"
                        />
                      </ContentLoader>
                    </div>
                    <div className="col-md-4 col-6">
                      <ContentLoader viewBox="0 0 380 320">
                        {/* Only SVG shapes */}
                        <rect
                          x="0"
                          y="0"
                          rx="5"
                          ry="5"
                          width="100%"
                          height="280"
                        />
                      </ContentLoader>
                    </div>
                  </div>
                </div>
                {/* {shwoNewArrivalProducts()} */}
              </div>
            </section>
            {/* <FeaturedProduct featuredProduct={featuredProduct} /> */}
          </div>
        </div>
      </main>
    </React.Fragment>
    // <div>
    //   <ContentLoader viewBox="0 0 380 70">
    //     {/* Only SVG shapes */}
    //     <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    //     <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    //     <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    //   </ContentLoader>
    // </div>
  );
};

export default HomeSkeleton;
