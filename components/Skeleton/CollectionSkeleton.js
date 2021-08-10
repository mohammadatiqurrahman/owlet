import React from "react";
import ContentLoader, { Facebook } from "react-content-loader";
const CollectionSkeleton = () => {
  return (
    <main className="main">
      <div className="page-content mb-10 pb-3">
        <div className="container">
          <section>
            <div className="row">
              <div className="col-lg-12 mb-4">
                <ContentLoader viewBox="0 0 380 70">
                  {/* Only SVG shapes */}
                  {/* <rect x="0" y="0" rx="5" ry="5" width="70" height="70" /> */}
                  <rect x="0" y="2" rx="4" ry="4" width="100%" height="69" />
                  {/* <rect x="80" y="40" rx="3" ry="3" width="250" height="10" /> */}
                </ContentLoader>
              </div>
            </div>
          </section>
          <div className="row gutter-lg">
            <aside className="col-lg-3 sidebar sidebar-fixed shop-sidebar sticky-sidebar-wrapper">
              <div className="sidebar-content">
                <div className="sticky-sidebar">
                  <ContentLoader>
                    {/* Only SVG shapes */}

                    <rect x="0" y="25" rx="4" ry="4" width="100%" height="15" />
                    <rect x="0" y="50" rx="3" ry="3" width="100%" height="13" />
                    <rect x="0" y="70" rx="3" ry="3" width="100%" height="13" />
                  </ContentLoader>
                  <ContentLoader>
                    {/* Only SVG shapes */}

                    <rect x="0" y="0" rx="4" ry="4" width="100%" height="15" />
                    <rect x="0" y="20" rx="3" ry="3" width="100%" height="13" />
                    <rect x="0" y="40" rx="3" ry="3" width="100%" height="13" />
                  </ContentLoader>
                  <ContentLoader>
                    {/* Only SVG shapes */}

                    <rect x="0" y="0" rx="4" ry="4" width="100%" height="15" />
                    <rect x="0" y="20" rx="3" ry="3" width="100%" height="13" />
                    <rect x="0" y="40" rx="3" ry="3" width="100%" height="13" />
                  </ContentLoader>
                  <ContentLoader>
                    {/* Only SVG shapes */}

                    <rect x="0" y="0" rx="4" ry="4" width="100%" height="15" />
                    <rect x="0" y="20" rx="3" ry="3" width="100%" height="13" />
                    <rect x="0" y="40" rx="3" ry="3" width="100%" height="13" />
                  </ContentLoader>
                </div>
              </div>
            </aside>
            {/* {products.length > 0 ? <Product /> : <NoProductFound />} */}

            <div className="col-lg-9 text-center">
              <div className="row cols-2 cols-sm-3 product-wrapper">
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                  return (
                    <div className="product-wrap" key={index}>
                      <div className="product text-center">
                        <figure className="product-media">
                          <ContentLoader>
                            {/* Only SVG shapes */}

                            <rect
                              x="0"
                              y="0"
                              rx="4"
                              ry="4"
                              width="280"
                              height="125"
                            />
                            <rect
                              x="0"
                              y="130"
                              rx="3"
                              ry="3"
                              width="250"
                              height="10"
                            />
                            <rect
                              x="0"
                              y="145"
                              rx="3"
                              ry="3"
                              width="250"
                              height="10"
                            />
                          </ContentLoader>
                        </figure>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CollectionSkeleton;
