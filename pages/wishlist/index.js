import React from "react";
import { useWishlistContext } from "../../context/wishlist_context";
import Head from "next/head";
import Link from "next/link";

const index = () => {
  const { wishlist, removeWishlistItem } = useWishlistContext();
  if (wishlist.length === 0) {
    return (
      <React.Fragment>
        <Head>
          <title>Wishlist | The Owlet</title>
        </Head>
        <div className="container mt-7 mb-2">
          <div className="row justify-content-center">
            <h3 className="text-center">Your wishlist is empty</h3>
            <Link href="/">
              <a
                className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4 "
                style={{ width: "300px" }}
              >
                <i className="d-icon-arrow-left"></i>Continue Shopping
              </a>
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>Wishlist | The Owlet</title>
      </Head>
      <main className="main">
        <div className="page-content pt-10 pb-10 mb-2">
          <div className="container">
            <table className="shop-table wishlist-table mt-2 mb-4">
              <thead>
                <tr>
                  <th className="product-name">
                    <span>Product</span>
                  </th>
                  <th></th>
                  <th className="product-price">
                    <span>Price</span>
                  </th>

                  <th className="product-add-to-cart"></th>
                  <th className="product-remove"></th>
                </tr>
              </thead>
              <tbody className="wishlist-items-wrapper">
                {wishlist.map((item) => {
                  const {
                    id,
                    main_image,
                    title,
                    price,
                    sale_percentage,
                    slug,
                  } = item;

                  return (
                    <tr key={id}>
                      <td className="product-thumbnail">
                        {/* <a href="product-simple.html"> */}
                        <figure>
                          <img
                            src={
                              main_image
                                ? main_image
                                : "/images/dummy-images/cart-image.jpg"
                            }
                            width="100"
                            height="100"
                            alt="product"
                          />
                        </figure>
                        {/* </a> */}
                      </td>
                      <td className="product-name">
                        {/* <a href="product-simple.html"> */}
                        {title}
                        {/* </a> */}
                      </td>
                      <td className="product-price">
                        <span className="amount">
                          {sale_percentage
                            ? sale_percentage &&
                              Math.round(
                                JSON.parse(price) -
                                  (JSON.parse(sale_percentage) *
                                    JSON.parse(price)) /
                                    100
                              )
                            : price && JSON.parse(price)}
                        </span>
                        <br />
                        <del>{sale_percentage && Math.round(price)}</del>
                      </td>

                      <td className="product-add-to-cart">
                        <Link href={`/products/${slug}`}>
                          <a className="btn btn-primary">
                            <span>View Product</span>
                          </a>
                        </Link>
                      </td>
                      <td className="product-remove">
                        <div>
                          <a
                            onClick={() => removeWishlistItem(id)}
                            className="remove"
                            title="Remove this product"
                          >
                            <i className="fas fa-times"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default index;
