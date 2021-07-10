import Link from "next/link";
import React from "react";
import { useCartContext } from "../../context/cart_context";
import Head from "next/head";
const index = () => {
  const {
    wishlist,
    // clearCart,
    removeWishlistItem,
  } = useCartContext();
  // console.log(wishlist);
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
    <main className="main">
      <div className="page-content pt-10 pb-10 mb-2">
        <div className="container">
          <table className="shop-table wishlist-table mt-2 mb-4">
            <thead>
              <tr>
                <th className="product-name">
                  <span>Image</span>
                </th>
                <th>
                  <span>Name</span>
                </th>
                <th className="product-price">
                  <span>Price</span>
                </th>
                <th className="product-stock-status">
                  <span>Variants</span>
                </th>

                <th className="product-add-to-cart"></th>
                <th className="product-remove"></th>
              </tr>
            </thead>
            <tbody className="wishlist-items-wrapper">
              {wishlist.map((item) => {
                const {
                  id,
                  image,
                  name,
                  color,
                  size,
                  price,
                  real_price,
                  discount,
                  slug,
                } = item;
                return (
                  <tr key={id}>
                    <td className="product-thumbnail">
                      <a href="product-simple.html">
                        <figure>
                          <img
                            src={
                              image
                                ? image
                                : "/images/dummy-images/cart-image.jpg"
                            }
                            width="100"
                            height="100"
                            alt="product"
                          />
                        </figure>
                      </a>
                    </td>
                    <td className="product-price">
                      <p>{name}</p>
                    </td>
                    <td className="product-price">
                      <span className="amount">{price}</span>
                      <br />
                      <del>
                        {/* {item.sale_percentage &&
                          JSON.parse(item.price) +
                            (JSON.parse(item.sale_percentage) *
                              JSON.parse(item.price)) /
                              100} */}
                        {Math.floor(real_price)}
                      </del>
                    </td>
                    <td className="product-price">
                      <div className="product-form product-color">
                        <div className="product-variations">
                          <label className="mr-2">Color:</label>
                          <a
                            className="color"
                            style={{
                              backgroundColor: color,
                              height: "18px",
                              width: "18px",
                            }}
                          ></a>
                        </div>
                      </div>
                      <div className="product-form product-color">
                        <div className="product-variations">
                          <label className="mr-2">Size:</label>
                          <span
                            className="color"
                            style={{
                              height: "18px",
                              width: "18px",
                            }}
                          >
                            {size}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="product-add-to-cart">
                      <Link href={`/products/${slug}`}>
                        <a className="btn-product btn-primary">
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
  );
};

export default index;
