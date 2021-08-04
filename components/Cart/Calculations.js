import React from "react";
import { useCartContext } from "../../context/cart_context";
import Link from "next/link";
import { useUserContext } from "../../context/user_context";

const Calculations = () => {
  const { user } = useUserContext();

  const {
    cart,
    clearCart,
    removeItem,
    toggleAmount,
    total_amount,
    total_tax,
    shipping_fee,
  } = useCartContext();

  const increase = (id) => {
    toggleAmount(id, "inc");
  };
  const decrease = (id) => {
    toggleAmount(id, "dec");
  };
  if (cart.length === 0) {
    return (
      <div className="container mt-7 mb-2">
        <div className="row justify-content-center">
          <h3 className="text-center">Your Cart Is Empty</h3>
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
    );
  }

  const shopTable = () => {
    return (
      <>
        <table className="shop-table cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th></th>
              <th>Variants</th>
              <th>Price</th>
              <th>quantity</th>
              <th>Tax</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const {
                id,
                image,
                name,
                color,
                size,
                price,
                tax,
                amount,
                real_price,
              } = item;

              return (
                <tr key={id}>
                  <td className="product-thumbnail">
                    <figure>
                      <a href="product-simple.html">
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
                      </a>
                    </figure>
                  </td>
                  <td className="product-name">
                    <div className="product-name-section">
                      <a href="product-simple.html">{name}</a>
                    </div>
                  </td>
                  <td className="product-subtotal">
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
                  <td className="product-subtotal">
                    <span className="amount">
                      <span className="amount"> {price}</span>
                    </span>
                    <br />
                    <del>{Math.floor(real_price)}</del>
                  </td>
                  <td className="product-quantity">
                    <div className="input-group">
                      <button
                        className="quantity-minus d-icon-minus"
                        onClick={() => decrease(id)}
                      ></button>
                      <input
                        className="quantity form-control"
                        type="number"
                        value={amount}
                        readOnly
                      />
                      <button
                        className="quantity-plus d-icon-plus"
                        onClick={() => increase(id)}
                      ></button>
                    </div>
                  </td>
                  <td className="product-price">
                    <span className="amount">{tax ? Math.floor(tax) : 0}%</span>
                  </td>
                  <td className="product-price">
                    <span className="amount">{price * amount}</span>
                  </td>
                  <td className="product-close">
                    <a
                      className="product-remove"
                      title="Remove this product"
                      onClick={() => removeItem(id)}
                    >
                      <i className="fas fa-times"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="cart-actions mb-6 pt-4">
          <Link href="/">
            <a className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4">
              <i className="d-icon-arrow-left"></i>Continue Shopping
            </a>
          </Link>
          <div
            className="btn btn-dark btn-md btn-rounded btn-icon-left mb-4"
            onClick={clearCart}
          >
            Clear Cart
          </div>
        </div>
      </>
    );
  };

  // Coupon
  const couponSection = () => {
    return (
      <div className="cart-coupon-box mb-8">
        <h4 className="title coupon-title text-uppercase ls-m">
          Coupon Discount
        </h4>
        <input
          type="text"
          name="coupon_code"
          className="input-text form-control text-grey ls-m mb-4"
          id="coupon_code"
          placeholder="Enter coupon or gift code here..."
        />
        <button
          type="submit"
          className="btn btn-md btn-dark btn-rounded btn-outline"
        >
          Apply Coupon
        </button>
      </div>
    );
  };

  // Cart calculation
  const cartCalculation = () => {
    return (
      <aside className="col-lg-4 sticky-sidebar-wrapper">
        <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
          <div className="summary mb-4">
            <h3 className="summary-title text-left">Cart Total</h3>
            <table className="shipping">
              <tbody>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">
                      Subtotal{" "}
                      <span className="font-weight-normal">(w/o Tax)</span>
                    </h4>
                  </td>
                  <td>
                    <p className="summary-subtotal-price">BDT {total_amount}</p>
                  </td>
                </tr>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Tax</h4>
                  </td>
                  <td>
                    <p className="summary-subtotal-price">BDT {total_tax}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="total">
              <tbody>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Total</h4>
                  </td>
                  <td>
                    <p className="summary-total-price ls-s">
                      BDT {total_amount + total_tax}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.length > 0 && (
              <Link href={`${user ? "/checkout" : "/before_checkout"}`}>
                <span className="btn btn-dark btn-rounded btn-checkout">
                  Proceed to checkout
                </span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    );
  };
  return (
    <div className="container-fluid mt-7 mb-2">
      <div className="row">
        <div className="col-lg-8 col-md-12 pr-lg-4">
          {shopTable()}
          {couponSection()}
        </div>
        {cartCalculation()}
      </div>
    </div>
  );
};

export default Calculations;
