import React from "react";

const BottomPage = () => {
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

          <ul className="mobile-menu mmenu-anim">
            <li>
              <a href="demo24.html">Home</a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {bottomMenuForMobile()}

      {bottomToTopButton()}

      {mobileNavigation()}
    </React.Fragment>
  );
};

export default BottomPage;
