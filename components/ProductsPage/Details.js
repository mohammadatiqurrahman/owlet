import Link from "next/link";
import React, { useState } from "react";
import { useCartContext } from "../../context/cart_context";
import { useProductsContext } from "../../context/products_context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { useWishlistContext } from "../../context/wishlist_context";
const Details = ({ slugForFacebookShare }) => {
  const { single_product: product, handleCart } = useProductsContext();

  const { addToCart, cart } = useCartContext();
  const { addToWishlist, wishlist } = useWishlistContext();

  const {
    id,
    title,
    price,
    description,
    sale_percentage,
    shipping_return_detail,
    tax,
    newVariants,
    variants,
    meta_description,
    meta_keywords,
  } = product;

  // Sizes
  const [sizes, setSizes] = useState([]);
  const colorSize = [].concat.apply(
    [],
    sizes.map((item) => Object.keys(item))
  );

  // Amount
  const [amount, setAmount] = useState(1);
  const [stock, setStock] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  const [colorNote, setColorNote] = useState(false);
  const [sizeNote, setSizeNote] = useState(false);

  const wishlistStatus = wishlist.find(
    (item) => item.slug === slugForFacebookShare
  );

  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (stock == 0) {
        toast.error("Out of stock!");
        return;
      }
      if (tempAmount > stock) {
        tempAmount = stock;
        toast.error("Maximum quantity reached!");
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (stock == 0) {
        tempAmount = 0;
        return tempAmount;
      }
      if (tempAmount <= 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  const productPrice = () => {
    return (
      <div className="product-price">
        <ins className="new-price">
          TK &nbsp;
          {sale_percentage
            ? Math.round(
                JSON.parse(price) -
                  (JSON.parse(sale_percentage) * JSON.parse(price)) / 100
              )
            : price && JSON.parse(price)}
        </ins>
        <br />
        {sale_percentage && (
          <del className="old-price">TK {Math.round(price)}</del>
        )}
        {sale_percentage && (
          <ins className="new-price ml-2" style={{ fontSize: "2rem" }}>
            {sale_percentage}% OFF
          </ins>
        )}
      </div>
    );
  };

  const productDetails = () => {
    return (
      <div className="product-short-desc">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    );
  };

  const productColors = () => {
    return (
      <>
        <div
          className="product-form product-color"
          style={{ marginBottom: colorNote ? "0px" : "1rem" }}
        >
          <label>Colour:</label>
          <div className="product-variations">
            {newVariants &&
              newVariants.map((item, index) => {
                return (
                  <a
                    className={`color ${
                      selectedColor === item.color_code ? "active" : ""
                    }`}
                    data-src="images/demos/demo7/products/big1.jpg"
                    style={{ backgroundColor: item.color_code }}
                    key={index}
                    onClick={() => {
                      setSizes(item.sizes);
                      setSelectedColor(item.color_code);
                      setColorNote(false);
                      setSelectedColorName(item.color_name);
                    }}
                  ></a>
                );
              })}
          </div>
        </div>
        {colorNote && (
          <div
            className="alert alert-danger mb-2"
            style={{
              backgroundColor: "#f8d7da",
              borderColor: "#f5c6cb",
              padding: "4px 4px 4px 16px",
            }}
            role="alert"
          >
            Please choose a colour first!
          </div>
        )}
      </>
    );
  };

  const productSizes = () => {
    return (
      <>
        {colorSize.length !== 0 && (
          <div
            className="product-form product-size"
            style={{ marginBottom: sizeNote ? "0px" : "1rem" }}
          >
            <label>Size:</label>
            <div className="product-form-group">
              <div className="product-variations">
                {colorSize.map((item, index) => {
                  return (
                    <a
                      style={{ width: "auto" }}
                      className={`size ${
                        selectedSize === item ? "active" : ""
                      }`}
                      key={index}
                      onClick={() => {
                        const singleProduct = sizes.find(
                          (product) => product[item]
                        );

                        const singleProductQuantity =
                          singleProduct[item].quantity;
                        setStock(singleProductQuantity);

                        setSelectedSize(item);
                        setSizeNote(false);
                        singleProductQuantity == 0
                          ? setAmount(0)
                          : setAmount(1);
                      }}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {sizeNote && (
          <div
            className="alert alert-danger mb-2"
            style={{
              backgroundColor: "#f8d7da",
              borderColor: "#f5c6cb",
              padding: "4px 4px 4px 16px",
            }}
            role="alert"
          >
            Please choose a size first!
          </div>
        )}
      </>
    );
  };

  const productQuantity = () => {
    return (
      <>
        <div
          className="product-form product-qty"
          style={{ marginBottom: stock == 0 ? "0px" : "1rem" }}
        >
          <label>QTY:</label>

          <div className="product-form-group">
            <div className="input-group">
              <button
                className="quantity-minus d-icon-minus"
                onClick={() => {
                  if (selectedSize && selectedColor) {
                    decrease();
                  } else if (selectedSize) {
                    setColorNote(true);
                  } else if (selectedColor) {
                    setSizeNote(true);
                  } else {
                    setColorNote(true);
                  }
                }}
              ></button>
              <input
                className="quantity form-control"
                type="number"
                value={amount}
                readOnly
              />
              <button
                className="quantity-plus d-icon-plus"
                onClick={() => {
                  if (selectedSize && selectedColor) {
                    increase();
                  } else if (selectedSize) {
                    setColorNote(true);
                  } else if (selectedColor) {
                    setSizeNote(true);
                  } else {
                    setColorNote(true);
                  }
                }}
              ></button>
            </div>
            {stock == 0 ? (
              <button className="btn btn-disabled">
                <i className="d-icon-bag mb-1"></i> Add To Cart
              </button>
            ) : (
              <button
                className="btn-product btn-cart"
                onClick={() => {
                  if (selectedColor && selectedSize) {
                    if (amount !== 0) {
                      handleCart("open");
                      addToCart(
                        id,
                        selectedColor,
                        selectedSize,
                        selectedColorName,
                        stock,
                        amount,
                        product
                      );
                    }
                  } else if (selectedColor) {
                    setSizeNote(true);
                  } else if (selectedSize) {
                    setColorNote(true);
                  } else {
                    setColorNote(true);
                  }
                }}
              >
                <i className="d-icon-bag mb-1"></i>
                Add To Cart
              </button>
            )}
          </div>
        </div>
        {stock == 0 ? <div style={{ color: "red" }}>Out of stock!</div> : null}
      </>
    );
  };

  const productSocilaShare = () => {
    return (
      <div className="social-links mr-4">
        <FacebookShareButton
          url={`https://owlet.vercel.app/products/${slugForFacebookShare}`}
        >
          <a className="social-link social-facebook fab fa-facebook-f"></a>
        </FacebookShareButton>
      </div>
    );
  };

  const productAddToWishlist = () => {
    return (
      <div className="product-action">
        <button
          className="btn-product btn-wishlist"
          style={{ border: "none", cursor: "pointer" }}
          onClick={() => {
            // if (selectedColor && selectedSize) {
            addToWishlist(product);
            // toast.success("Successfully added to the wishlist");
            // } else if (selectedColor) {
            //   setSizeNote(true);
            // } else if (selectedSize) {
            //   setColorNote(true);
            // } else {
            //   setColorNote(true);
            // }
          }}
        >
          {/* {wishlist.find((item) => item.slug == slugForFacebookShare)} */}
          {wishlistStatus ? (
            <span style={{ color: "#f27955" }}>
              <i className="fas fa-heart"></i> Already In Wishlist
            </span>
          ) : (
            <span>
              <i className="d-icon-heart"></i> Add To Wishlist
            </span>
          )}
        </button>
        <ToastContainer />
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="col-md-6">
        <div className="product-details">
          <h1 className="product-name">{title}</h1>

          {productPrice()}
          {productDetails()}
          {productColors()}
          {productSizes()}
          <hr className="product-divider" />

          {productQuantity()}
          <hr className="product-divider mb-3" />

          <div className="product-footer">
            {productSocilaShare()}
            <span className="divider"></span>
            {productAddToWishlist()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Details;
