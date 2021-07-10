import Link from "next/link";
import React from "react";
import SingleProduct from "../SingleProduct";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <React.Fragment>
      {relatedProducts && (
        <section className="related-products">
          <h2 className="title">Related Products</h2>
          <div className="product-grid row">
            <div className="row">
              {relatedProducts.length > 0 &&
                relatedProducts.map((item, index) => {
                  // console.log(item);
                  return (
                    <div key={index} className="col-md-3 col-6">
                      <SingleProduct item={item} />
                      {/* <div className="product product-variable text-center">
                        <figure className="product-media">
                          <Link href={`/products/${item.slug}`}>
                            <img
                              src={`${
                                item.main_image
                                  ? item.main_image
                                  : "/images/dummy-images/product-preview.jpg"
                              }`}
                              alt="product"
                              width="247"
                              height="278"
                            />
                          </Link>
                          <div className="product-label-group">
                            {item.new_arrival === "1" && (
                              <label className="product-label label-new">
                                new
                              </label>
                            )}
                            {item.sale_percentage && (
                              <label className="product-label label-sale">
                                {item.sale_percentage}% OFF
                              </label>
                            )}
                          </div>
                          <div className="product-action-vertical">
                            <a
                              href="#"
                              className="btn-product-icon btn-cart"
                              data-toggle="modal"
                              data-target="#addCartModal"
                              title="Add to cart"
                            >
                              <i className="d-icon-bag"></i>
                            </a>
                            <a
                              href="#"
                              className="btn-product-icon btn-wishlist"
                              title="Add to wishlist"
                            >
                              <i className="d-icon-heart"></i>
                            </a>
                          </div>
                        </figure>
                        <div className="product-details">
                          <h3 className="product-name">
                            <Link href={`/products/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h3>
                          <div className="product-price">
                            <ins className="new-price">
                              TK &nbsp;
                              {item.sale_percentage
                                ? item.sale_percentage &&
                                  Math.round(
                                    JSON.parse(item.price) -
                                      (JSON.parse(item.sale_percentage) *
                                        JSON.parse(item.price)) /
                                        100
                                  )
                                : item.price && JSON.parse(item.price)}
                            </ins>
                            <del className="old-price">
                              {item.sale_percentage && Math.round(item.price)}
                            </del>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default RelatedProducts;
