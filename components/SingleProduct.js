import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import HomeCartWishlist from "../components/HomeCartWishlist";
import { useCartContext } from "../context/cart_context";
const SingleProduct = ({ item }) => {
  const { HomeCartWishlistStatus, setHomeCartWishlistStatus } =
    useCartContext();
  const [slugForHomeCart, setSlugForHomeCart] = useState(null);
  const router = useRouter();
  const { slug } = router;
  // console.log(item);

  return (
    <div className="product text-center">
      <figure className="product-media">
        <Link href={`/products/${item.slug}`}>
          <a>
            <img
              src={`${
                item.main_image
                  ? item.main_image
                  : "/images/dummy-images/product-preview.jpeg"
              }`}
              alt="product"
              width="247"
              height="278"
            />
          </a>
        </Link>
        <div className="product-label-group">
          {item.new_arrival === "1" && (
            <label className="product-label label-new">new</label>
          )}
          {item.sale_percentage && (
            <label className="product-label label-sale">
              {item.sale_percentage}% OFF
            </label>
          )}
        </div>
        <div className="product-action-vertical">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              setHomeCartWishlistStatus(true);
              setSlugForHomeCart(item.slug);
            }}
            className="btn-product-icon btn-cart"
            title="Add to cart"
          >
            <i className="d-icon-bag"></i>
          </a>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              setHomeCartWishlistStatus(true);
              setSlugForHomeCart(item.slug);
            }}
            className="btn-product-icon btn-wishlist"
            title="Add to wishlist"
          >
            <i className="d-icon-heart"></i>
          </a>
        </div>
      </figure>
      {HomeCartWishlistStatus && <HomeCartWishlist slug={slugForHomeCart} />}
      <div className="product-details">
        <h3 className="product-name">
          <Link href={`/products/${item.slug}`}>
            <a>{item.title}</a>
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
    </div>
  );
};

export default SingleProduct;
