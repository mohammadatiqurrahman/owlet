import React, { useState } from "react";
import Link from "next/link";
import { useProductsContext } from "../context/products_context";
import { useCartContext } from "../context/cart_context";
import { based_url } from "../utils/constants";
import { useRouter } from "next/router";
import { useUserContext } from "../context/user_context";
const Header = ({ navigations, newArrival, onSale }) => {
  const router = useRouter();

  const { handleCart, fetchNavigationsChild, navigations_child } =
    useProductsContext();
  const { user } = useUserContext();
  // console.log(user);
  const [childrenNavigations, setChildrenNavigations] = useState([]);
  // console.log(childrenNavigations);
  const { wishlist, cart, removeItem, total_amount, total_tax } =
    useCartContext();

  const [navSize, setNavSize] = useState([]);
  const hoverHandler = async (id) => {
    // fetchNavigationsChild(`${based_url}/category/${id}/child/list`);
    const idWiseChildren = navigations_child.filter(
      (item) => item.parent_id == id
    );
    setChildrenNavigations(idWiseChildren);
    const navSizeRes = await fetch(`${based_url}/category/${id}/size/list`);
    const navSizeData = await navSizeRes.json();

    setNavSize(navSizeData);
  };

  // Search Functionality Start
  const [searchInput, setSearchInput] = useState("");
  const [searchError, setSearchError] = useState(false);
  const searchInputHandler = (e) => {
    const value = e.currentTarget.value;
    setSearchInput(value);
  };
  const searchHandleSubmit = async (e) => {
    e.preventDefault();

    router.push(`/search/${searchInput}`);
  };
  // Search Functionality End
  return (
    <header className="header">
      <div className="header-middle has-center">
        <div className="container">
          <div className="header-left">
            <a
              className="mobile-menu-toggle"
              onClick={() => {
                document.body.classList.add("mmenu-active");
              }}
            >
              <i className="d-icon-bars2"></i>
            </a>

            <div className="header-search hs-simple d-lg-show">
              <form
                action="#"
                className="input-wrapper"
                onSubmit={searchHandleSubmit}
              >
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  autoComplete="off"
                  placeholder="Search..."
                  required
                  onChange={searchInputHandler}
                />
                <button className="btn btn-search" type="submit">
                  <i className="d-icon-search"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="header-center">
            <Link href="/">
              <a className="logo mr-0">
                <img
                  src="/images/demos/demo24/owlet.svg"
                  alt="logo"
                  width="154"
                  height="43"
                />
              </a>
            </Link>
          </div>

          <div className="header-right">
            <Link href="/login">
              <a className="login mr-lg-6 mr-4">
                <i className="d-icon-user"></i> &nbsp;
                {user && (
                  <h5 style={{ margin: "auto 0" }}>
                    {user.customer.name.split(" ")[0]}
                  </h5>
                )}
                {/* <h5 style={{ margin: "auto 0" }}>Hello, Amir</h5> */}
              </a>
            </Link>

            <Link href="/wishlist">
              <a className="wishlist">
                <i className="d-icon-heart"></i>
              </a>
            </Link>
            <span className="divider"></span>
            {/* <div className="dropdown cart-dropdown type2 cart-offcanvas mr-0 mr-lg-2">
              <Link href="/wishlist">
                <a
                  className="cart-toggle label-block link newcolor"
                  style={{ cursor: "pointer" }}
                >
                  <i className="d-icon-heart">
                    <span className="cart-count">
                      {wishlist && wishlist.length}
                    </span>
                  </i>
                </a>
              </Link>
            </div> */}
            {/* <span className="divider"></span> */}
            <div className="dropdown cart-dropdown type2 cart-offcanvas mr-0 mr-lg-2">
              <a
                onClick={() => handleCart("open")}
                className="cart-toggle label-block link"
                style={{ cursor: "pointer" }}
              >
                <div className="cart-label d-lg-show">
                  <span className="cart-name">Shopping Cart:</span>
                  <span className="cart-price">TK {total_amount}</span>
                </div>
                <i className="d-icon-bag">
                  <span className="cart-count">{cart && cart.length}</span>
                </i>
              </a>

              <div
                className="cart-overlay"
                onClick={() => handleCart("close")}
              ></div>

              <div className="dropdown-box">
                <div className="cart-header">
                  <h4 className="cart-title">Shopping Cart</h4>
                  <a
                    className="btn btn-dark btn-link btn-icon-right btn-close"
                    onClick={() => handleCart("close")}
                  >
                    close<i className="d-icon-arrow-right"></i>
                    <span className="sr-only">Cart</span>
                  </a>
                </div>

                <div className="products scrollable">
                  {cart &&
                    cart.map((item, index) => {
                      // console.log(item);
                      return (
                        <div className="product product-cart" key={index}>
                          <figure className="product-media">
                            <a href="#">
                              <img
                                src={
                                  item.image
                                    ? item.image
                                    : "/images/dummy-images/cart-image.jpg"
                                }
                                alt="product"
                              />
                            </a>
                            <button
                              className="btn btn-link btn-close"
                              onClick={() => removeItem(item.id)}
                            >
                              <i className="fas fa-times"></i>
                              <span className="sr-only">Close</span>
                            </button>
                          </figure>
                          <div className="product-detail">
                            <a
                              href="product.html"
                              className="product-name"
                              style={{ color: "black", fontSize: "18px" }}
                            >
                              {item.name}
                            </a>
                            <div className="price-box">
                              <span
                                style={{
                                  border: "1px solid gray",
                                  padding: "2px 5px",
                                  marginRight: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                Size: {item.size}
                              </span>
                              <span
                                style={{
                                  height: "22px",
                                  width: "22px",
                                  backgroundColor: item.color,
                                  borderRadius: "50%",
                                }}
                              ></span>
                            </div>
                            <div className="price-box">
                              <span className="product-quantity">
                                {item.amount}
                              </span>
                              <span className="product-price">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* <div className="cart-total">
                  <label>Subtotal:</label>
                  <span className="price">$42.00</span>
                </div> */}

                <div
                  className="cart-action mt-4"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  {cart.length > 0 && (
                    <Link href="/cart" className="btn btn-dark">
                      <span
                        onClick={() => handleCart("close")}
                        style={{ cursor: "pointer" }}
                      >
                        Go To Cart
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom sticky-header fix-top sticky-content  has-center d-lg-block d-none">
        <div className="container justify-content-center">
          <nav className="main-nav">
            <ul className="menu">
              <li className="active">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>

              {navigations.length > 0 &&
                navigations.map((navigation) => {
                  return (
                    <li
                      key={navigation.id}
                      // onMouseOver={() => hoverHandler(navigation.id)}
                    >
                      <span onMouseOver={() => hoverHandler(navigation.id)}>
                        <Link href={`/collections/${navigation.slug}`}>
                          {navigation.title}
                        </Link>
                      </span>
                      <div className="megamenu">
                        <div className="row pt-5 pb-5 mt-5 mb-5">
                          <div className="col-md-2"></div>
                          <div
                            className="col-3 col-sm-3 col-md-3 col-lg-3"
                            style={{ borderRight: "1px solid gray" }}
                          >
                            <h4 className="menu-title">Categories</h4>
                            <div className="row">
                              {childrenNavigations.length > 0 &&
                                childrenNavigations.map((item) => {
                                  return (
                                    <div
                                      className="col-md-6 m-0 p-0"
                                      key={item.id}
                                    >
                                      <ul>
                                        <li>
                                          <Link href={`/category/${item.slug}`}>
                                            {item.title}
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div
                            className="col-2 col-sm-2 col-md-2 col-lg-2"
                            style={{
                              borderRight: "1px solid gray",
                              textAlign: "center",
                            }}
                          >
                            <h4 className="menu-title">Size</h4>
                            <ul>
                              {navSize.length > 0 &&
                                navSize.map((item, index) => {
                                  // console.log(item);
                                  return (
                                    <li key={index}>
                                      <Link href={`/size/${item.slug}`}>
                                        {item.label}
                                      </Link>
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>

                          <div className="col-3 col-sm-3 col-md-3 col-lg-3 menu-banner menu-banner1 banner banner-fixed">
                            <figure>
                              <img
                                src={
                                  navigation.menu_image ||
                                  "/images/dummy-images/mega-menu.jpg"
                                }
                                alt="Menu banner"
                                style={{ height: "225px", width: "315px" }}
                              />
                            </figure>
                            {/* <div className="banner-content y-50">
                              <h4 className="banner-subtitle font-weight-bold text-primary ls-m">
                                Sale.
                              </h4>
                              <h3 className="banner-title font-weight-bold">
                                <span className="text-uppercase">Up to</span>70%
                                Off
                              </h3>
                              <a
                                href="shop.html"
                                className="btn btn-link btn-underline"
                              >
                                shop now<i className="d-icon-arrow-right"></i>
                              </a>
                            </div> */}
                          </div>
                          <div className="col-md-2"></div>
                        </div>
                      </div>
                    </li>
                  );
                })}

              {/* <li>
                <Link href="/aboutus">About Us</Link>
              </li> */}
              {newArrival && (
                <li>
                  <Link href={`/collections/new_arrival`}>New Arrivals</Link>
                </li>
              )}
              {onSale && (
                <li>
                  <Link href={`/collections/on_sale`} className="hot-deal">
                    On Sale
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;