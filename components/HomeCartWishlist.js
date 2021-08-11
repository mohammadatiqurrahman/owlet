import React, { useEffect, useState } from "react";
import { useProductsContext } from "../context/products_context";
import { useRouter } from "next/router";
import { based_url } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import Zoom from "react-img-zoom";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../context/cart_context";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Loading from "../components/Loading";
import { useWishlistContext } from "../context/wishlist_context";
const HomeCartWishlist = () => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
    handleCart,
  } = useProductsContext();
  const { setHomeCartWishlistStatus, slugForHomeCart, HomeCartWishlistStatus } =
    useCartContext();

  useEffect(() => {
    fetchSingleProduct(`${based_url}/product/${slugForHomeCart}`);
  }, [slugForHomeCart]);

  const notify = () => toast.success("Successfully added to the wishlist");
  const { addToCart, cart } = useCartContext();
  const { addToWishlist } = useWishlistContext();

  const {
    id,
    title,
    price,
    description,
    sale_percentage,
    shipping_return_detail,
    tax,
    newVariants,
    main_image,
    variants,
    meta_description,
    meta_keywords,
  } = product;

  const [sizes, setSizes] = useState([]);
  const colorSize = [].concat.apply(
    [],
    sizes.map((item) => Object.keys(item))
  );

  const [amount, setAmount] = useState(1);
  const [stock, setStock] = useState(1);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const [colorNote, setColorNote] = useState(false);
  const [sizeNote, setSizeNote] = useState(false);

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

  const showImage = () => {
    return (
      <div className="owl-stage-outer">
        <div
          className="owl-stage"
          style={{
            transform: "translate3d(0px, 0px, 0px)",
            transition: "all 0s ease 0s",
            width: "1856px",
          }}
        >
          <div className="owl-item active" style={{ width: "464px" }}>
            <figure className="product-image">
              <img
                src={main_image}
                data-zoom-image="images/product/product-1-1-800x900.jpg"
                alt="Blue Pinafore Denim Dress"
                width="580"
                height="580"
              />
            </figure>
          </div>
        </div>
      </div>
    );
  };

  const showProductPrice = () => {
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

  const showColors = () => {
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

  const showSizes = () => {
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

  const showQuantity = () => {
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
            <button
              className={
                stock == 0 ? "btn btn-disabled" : "btn-product btn-cart"
              }
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
                    toast.success("Successfully added to the cart");
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
          </div>
        </div>
        {stock == 0 ? <div style={{ color: "red" }}>Out of stock!</div> : null}
      </>
    );
  };

  const socialShareButton = () => {
    return (
      <div className="social-links mr-4">
        <FacebookShareButton
          url={`https://owlet.vercel.app/products/${slugForHomeCart}`}
        >
          <a className="social-link social-facebook fab fa-facebook-f"></a>
        </FacebookShareButton>
      </div>
    );
  };

  const addToWishListButton = () => {
    return (
      <div className="product-action">
        <button
          className="btn-product btn-wishlist"
          style={{ border: "none", cursor: "pointer" }}
          onClick={() => {
            addToWishlist(product);
          }}
        >
          <i className="d-icon-heart"></i>Add To Wishlist
        </button>
        <ToastContainer />
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        onClick={() => setHomeCartWishlistStatus(false)}
        className="mfp-bg mfp-product mfp-fade mfp-ready"
        style={{ display: `${HomeCartWishlistStatus ? "block" : "none"}` }}
      ></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-product mfp-fade mfp-ready"
        tabIndex="-1"
        style={{ display: `${HomeCartWishlistStatus ? "block" : "none"}` }}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="mfp-container mfp-ajax-holder mfp-s-ready">
            <div className="mfp-content">
              <div className="product product-single row product-popup">
                <div className="col-md-6">
                  <div className="product-gallery">
                    <div className="product-single-carousel owl-carousel owl-theme owl-nav-inner owl-loaded owl-drag">
                      {showImage()}

                      <div className="owl-dots disabled"></div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-details scrollable pr-0 pr-md-3">
                    <h1 className="product-name pl-0">{title}</h1>

                    {showProductPrice()}

                    <div className="product-short-desc">
                      <div dangerouslySetInnerHTML={{ __html: description }} />
                    </div>

                    {showColors()}

                    {showSizes()}

                    <hr className="product-divider" />

                    {showQuantity()}

                    <hr className="product-divider mb-3" />
                    <div className="product-footer">
                      {socialShareButton()}
                      <span className="divider"></span>
                      {addToWishListButton()}
                    </div>
                  </div>
                </div>
                <button
                  title="Close (Esc)"
                  type="button"
                  className="mfp-close"
                  onClick={() => setHomeCartWishlistStatus(false)}
                >
                  <span>×</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default HomeCartWishlist;
