import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import HeaderService from "../services/HeaderService";
import { useUserContext } from "../context/user_context";
import { useProductsContext } from "../context/products_context";

const BottomPage = ({ navigations, newArrival, onSale }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenuSubMenu, setShowSubMenuSubMenu] = useState(false);
  const [showSubMenuSizes, setShowSubMenuSizes] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  const router = useRouter();

  const { navigations_child } = useProductsContext();
  const { user } = useUserContext();

  const [childrenNavigations, setChildrenNavigations] = useState([]);
  const [navSize, setNavSize] = useState([]);
  const hoverHandler = async (id) => {
    const idWiseChildren = navigations_child.filter(
      (item) => item.parent_id == id
    );
    setChildrenNavigations(idWiseChildren);
    const navSizeData = await HeaderService.instance.categoryOnHoverSizes(id);

    setNavSize(navSizeData);
  };

  const [searchInput, setSearchInput] = useState("");
  const searchInputHandler = (e) => {
    const value = e.currentTarget.value;
    setSearchInput(value);
  };
  const searchHandleSubmit = async (e) => {
    e.preventDefault();

    router.push(`/search/${searchInput}`);
  };
  const bottomMenuForMobile = () => {
    return (
      <div className="sticky-footer sticky-content fix-bottom">
        <a href="demo24.html" className="sticky-link home">
          <i className="d-icon-home"></i>
          <span>Home</span>
        </a>
        <a href="demo24-shop.html" className="sticky-link category">
          <i className="d-icon-volume"></i>
          <span>Categories</span>
        </a>
        <a href="wishlist.html" className="sticky-link wishlist">
          <i className="d-icon-heart"></i>
          <span>Wishlist</span>
        </a>
        <a href="account.html" className="sticky-link account">
          <i className="d-icon-user"></i>
          <span>Account</span>
        </a>
        <div className="header-search hs-toggle dir-up">
          <a href="#" className="search-toggle sticky-link search">
            <i className="d-icon-search"></i>
            <span>Search</span>
          </a>
          <form action="#" className="input-wrapper">
            <input
              type="text"
              className="form-control"
              name="search"
              autoComplete="off"
              placeholder="Search your keyword..."
              required
            />
            <button className="btn btn-search" type="submit">
              <i className="d-icon-search"></i>
            </button>
          </form>
        </div>
      </div>
    );
  };

  const bottomToTopButton = () => {
    return (
      <a
        id="scroll-top"
        href="#top"
        title="Top"
        role="button"
        className="scroll-top"
      >
        <i className="d-icon-arrow-up"></i>
      </a>
    );
  };

  const mobileNavigation = () => {
    return (
      <div className="mobile-menu-wrapper">
        <div
          className="mobile-menu-overlay"
          onClick={() => {
            document.body.classList.remove("mmenu-active");
          }}
        ></div>

        <a
          className="mobile-menu-close"
          onClick={() => {
            document.body.classList.remove("mmenu-active");
          }}
        >
          <i className="d-icon-times"></i>
        </a>

        <div className="mobile-menu-container scrollable">
          <form onSubmit={searchHandleSubmit} className="input-wrapper">
            <input
              type="text"
              className="form-control"
              name="search"
              autoComplete="off"
              placeholder="Search your keyword..."
              required
              onChange={searchInputHandler}
            />
            <button
              className="btn btn-search"
              type="submit"
              onClick={() => {
                document.body.classList.remove("mmenu-active");
              }}
            >
              <i className="d-icon-search"></i>
            </button>
          </form>

          <ul className="mobile-menu mmenu-anim">
            <li
              onClick={() => {
                document.body.classList.remove("mmenu-active");
              }}
            >
              <Link href="/">Home</Link>
            </li>
            {navigations.length > 0 &&
              navigations.map((navigation) => {
                return (
                  <li key={navigation.id}>
                    <div className="subCategoryOpenAndClose">
                      <div
                        onClick={() => {
                          document.body.classList.remove("mmenu-active");
                        }}
                      >
                        <Link href={`/collections/${navigation.slug}`}>
                          {navigation.title}
                        </Link>
                      </div>
                      <div
                        style={{
                          margin: "auto 0",
                          fontWeight: "bold",
                          fontSize: "25px",
                        }}
                        onClick={() => {
                          setShowSubMenu(!showSubMenu);
                          setSelectedMenu(navigation.title);
                          hoverHandler(navigation.id);
                        }}
                      >
                        {selectedMenu === navigation.title && showSubMenu
                          ? "x"
                          : ">"}
                      </div>
                    </div>
                    <ul
                      style={{
                        display:
                          selectedMenu === navigation.title && showSubMenu
                            ? "block"
                            : "none",
                      }}
                    >
                      <li>
                        <div className="subCategoryOpenAndClose">
                          <div>
                            <a>Categories</a>
                          </div>
                          <div
                            style={{
                              margin: "auto 0",
                              fontWeight: "bold",
                              fontSize: "25px",
                            }}
                            onClick={() =>
                              setShowSubMenuSubMenu(!showSubMenuSubMenu)
                            }
                          >
                            {showSubMenuSubMenu ? "x" : ">"}
                          </div>
                        </div>
                        <ul
                          style={{
                            display: showSubMenuSubMenu ? "block" : "none",
                          }}
                        >
                          {childrenNavigations.length > 0 &&
                            childrenNavigations.map((item) => {
                              return (
                                <li
                                  key={item.id}
                                  onClick={() => {
                                    document.body.classList.remove(
                                      "mmenu-active"
                                    );
                                  }}
                                >
                                  <Link href={`/category/${item.slug}`}>
                                    {item.title}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                      <li>
                        <div className="subCategoryOpenAndClose">
                          <div>
                            <a>Sizes</a>
                          </div>
                          <div
                            style={{
                              margin: "auto 0",
                              fontWeight: "bold",
                              fontSize: "25px",
                            }}
                            onClick={() =>
                              setShowSubMenuSizes(!showSubMenuSizes)
                            }
                          >
                            {showSubMenuSizes ? "x" : ">"}
                          </div>
                        </div>
                        <ul
                          style={{
                            display: showSubMenuSizes ? "block" : "none",
                          }}
                        >
                          {navSize.length > 0 &&
                            navSize.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() => {
                                    document.body.classList.remove(
                                      "mmenu-active"
                                    );
                                  }}
                                >
                                  <Link href={`/size/${item.slug}`}>
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    </ul>
                  </li>
                );
              })}

            {newArrival && (
              <li
                onClick={() => {
                  document.body.classList.remove("mmenu-active");
                }}
              >
                <Link href={`/collections/new_arrival`}>New Arrivals</Link>
              </li>
            )}
            {onSale && (
              <li
                onClick={() => {
                  document.body.classList.remove("mmenu-active");
                }}
              >
                <Link href={`/collections/on_sale`} className="hot-deal">
                  On Sale
                </Link>
              </li>
            )}
            <li
              onClick={() => {
                document.body.classList.remove("mmenu-active");
              }}
            >
              <Link href="/login">
                <a className="btn btn-primary">
                  {user && user.customer.name
                    ? "go to dashboard"
                    : "sign/register"}
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {/* {bottomMenuForMobile()} */}

      {bottomToTopButton()}

      {mobileNavigation()}
    </React.Fragment>
  );
};

export default BottomPage;
