import React, { useEffect, useState } from "react";
import { useCartContext } from "../../context/cart_context";
import { useUserContext } from "../../context/user_context";
import Head from "next/head";

import { useRouter } from "next/router";

import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutService from "../../services/CheckoutService";
import Invoice from "../../models/invoice";

const index = ({ locations, shippingCostInDhaka, shippingCostOutDhaka }) => {
  const [shipToDifferent, setShipToDifferent] = useState(false);
  const router = useRouter();
  const { user } = useUserContext();
  const { cart, total_amount, total_tax, setPlaceOrderClick } = useCartContext();
  const [placeOrderButtonStatus, setPlaceOrderButtonStatus] = useState(false);

  // Prearing prducts for database
  const products = cart.map((item) => {
    return {
      id: item.product_id,
      name: item.name,
      color: item.colorName,
      size: item.size,
      price: item.price,
      quantity: item.amount,
      discount: item.discount,
      tax: total_tax,
      subtotal: total_amount,
    };
  });

  // Input handler and Error management start
  const inputHandlerTerms = (e) => {
    setCheckoutData({
      ...checkoutData,
      terms_condition: !checkoutData.terms_condition,
    });
  };

  const [checkoutError, setCheckoutError] = useState({
    shippingCostError: "",
    termsConditionError: "",
  });

  const [checkoutData, setCheckoutData] = useState({
    shipping_cost: shippingCostInDhaka,
    ship_to_different: "",
    terms_condition: false,
    payment_type: "cash_on_delivery",
  });

  const checkoutInputHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setCheckoutData({ ...checkoutData, [name]: value });
  };
  // Input handler and Error management End

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlaceOrderButtonStatus(true);
    if (
      !checkoutData.shipping_cost ||
      !checkoutData.terms_condition ||
      !checkoutData.payment_type
    ) {
      setPlaceOrderButtonStatus(false);
      setCheckoutError({
        ...checkoutError,
        fullNameError: checkoutData.fullName
          ? ""
          : "The full name field is required.",
        emailError: checkoutData.email ? "" : "The email field is required.",
        phoneError: checkoutData.phone ? "" : "The phone field is required.",
        locationError: checkoutData.location
          ? ""
          : "The location field is required.",
        areaError: checkoutData.area ? "" : "The area field is required.",
        zipError: checkoutData.zip ? "" : "The zip field is required.",
        addressError: checkoutData.address
          ? ""
          : "The address field is required.",
        shippingCostError: checkoutData.shipping_cost
          ? ""
          : "The shipping cost field is required.",
        termsConditionError: checkoutData.terms_condition
          ? ""
          : "Please click on the checkbox before placing order",
      });
      return;
    }

    // Invoice model
    const invoice = new Invoice(
      JSON.stringify(products),
      total_tax,
      checkoutData.shipping_cost,
      total_amount + total_tax + parseInt(checkoutData.shipping_cost),
      checkoutData.ship_to_different,
      checkoutData.payment_type
    );

    const orderResponse = await CheckoutService.instance.registeredUserCheckout(
      invoice,
      user
    );

    setPlaceOrderClick(orderResponse);
    router.push("/order");
    setPlaceOrderButtonStatus(false);
  };

  // Show user details in billing section
  const userBillingAddress = () => {
    return (
      <div
        className="card"
        style={{ border: "1px solid gray", borderRadius: "10px" }}
      >
        <div
          className="card-header"
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
          }}
        >
          <h5 className="card-title" style={{ padding: "15px" }}>
            Billing Address
          </h5>
        </div>
        <div className="card-body">
          <p className="card-text text-black">
            <span style={{ fontWeight: "bold" }}>Name: </span>
            {user && user.customer.name}
          </p>
          <p className="card-text text-black">
            <span style={{ fontWeight: "bold" }}>Email: </span>
            {user && user.customer.email}
          </p>
          <p className="card-text text-black">
            <span style={{ fontWeight: "bold" }}>Phone: </span>
            {user && user.customer.phone}
          </p>
          <p className="card-text text-black">
            <span style={{ fontWeight: "bold" }}>Address: </span>
            {user && user.customer.address}
          </p>
        </div>
      </div>
    );
  };

  // Shipping in different address
  const shipToDifferentAddress = () => {
    return (
      <div className="card accordion mt-5">
        <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
          <i className="fas fa-exclamation-circle"></i>

          <a
            className="text-primary collapse font-weight-bold"
            onClick={() => {
              setCheckoutData({
                ...checkoutData,
                ship_to_different: "",
              });
              setShipToDifferent(!shipToDifferent);
            }}
          >
            Ship to a different address?
          </a>
          <div
            className="alert-body collapsed"
            id="alert-body1"
            style={{ display: shipToDifferent ? "block" : "none" }}
          >
            <div className="col-lg-12 mb-6 mb-lg-0 pr-lg-4">
              {/* <h3 className="title title-simple text-left text-uppercase mt-2">
                            Shipping Details
                          </h3> */}

              <label className="mt-5">
                Shipping different address details (Optional)
              </label>
              <textarea
                className="form-control pb-2 pt-2 mb-0"
                cols="30"
                rows="5"
                type="text"
                name="ship_to_different"
                onChange={checkoutInputHandler}
                value={checkoutData.ship_to_different}
                placeholder="Different Address (Optional)"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Order details and shipping cost section
  const orderDetailsWithShippingCost = () => {
    return (
      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 &&
            cart.map((item, index) => {
              // console.log(item);
              const { amount, name, size, color, tax, price } = item;
              return (
                <tr key={index}>
                  <td className="product-name">
                    {name}{" "}
                    <span className="product-quantity">×&nbsp;{amount}</span>
                  </td>
                  <td className="product-total text-body">
                    BDT {amount * price}.00
                  </td>
                </tr>
              );
            })}

          <tr>
            <td className="product-name">Tax </td>
            <td className="product-total text-body">BDT {total_tax}.00</td>
          </tr>
          <tr>
            <td className="product-name">Shipping Cost </td>
            <td className="product-total text-body">
              BDT {Math.round(checkoutData.shipping_cost)}.00
            </td>
          </tr>
          <tr className="sumnary-shipping shipping-row-last">
            <td colSpan="2">
              <h4 className="summary-subtitle">Shipping Cost</h4>
              <ul>
                <li>
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="flat_rate"
                      name="shipping_cost"
                      className="custom-control-input"
                      onChange={checkoutInputHandler}
                      value={shippingCostInDhaka}
                      checked={
                        checkoutData.shipping_cost === shippingCostInDhaka
                          ? true
                          : false
                      }
                    />
                    <label className="custom-control-label" htmlFor="flat_rate">
                      Inside Dhaka - BDT {parseInt(shippingCostInDhaka)}.00
                    </label>
                  </div>
                </li>

                <li>
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="free-shipping"
                      name="shipping_cost"
                      className="custom-control-input"
                      onChange={checkoutInputHandler}
                      value={shippingCostOutDhaka}
                      checked={
                        checkoutData.shipping_cost === shippingCostOutDhaka
                          ? true
                          : false
                      }
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="free-shipping"
                    >
                      Outside Dhaka - BDT {parseInt(shippingCostOutDhaka)}
                      .00
                    </label>
                  </div>
                </li>

                {/* <li>
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="local_pickup"
                      name="shipping_cost"
                      className="custom-control-input"
                      onChange={checkoutInputHandler}
                      value={0}
                      required
                      checked={
                        checkoutData.shipping_cost == 0
                          ? true
                          : false
                      }
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="local_pickup"
                    >
                      Free Shipping Local pickup
                    </label>
                  </div>
                </li> */}
              </ul>
            </td>
          </tr>

          <tr className="summary-total">
            <td className="pb-0">
              <h4 className="summary-subtitle">Total</h4>
            </td>
            <td className=" pt-0 pb-0">
              <p className="summary-total-price ls-s text-primary">
                BDT{" "}
                {total_amount +
                  total_tax +
                  parseInt(checkoutData.shipping_cost)}
                .00
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  // This function will represent types of payment
  const paymentMethods = () => {
    return (
      <div className="payment accordion">
        <h4 className="summary-subtitle ls-m pb-3">Payment Methods</h4>
        <ul style={{ listStyleType: "none" }} className="pl-0">
          <li>
            <div className="custom-radio">
              <input
                type="radio"
                id="online_payment"
                name="payment_type"
                className="custom-control-input"
                onChange={checkoutInputHandler}
                value="online_payment"
                checked={
                  checkoutData.payment_type === "online_payment" ? true : false
                }
              />
              <label className="custom-control-label" htmlFor="online_payment">
                Pay Online
              </label>
            </div>
          </li>

          <li>
            <div className="custom-radio">
              <input
                type="radio"
                id="cash_on_delivery"
                name="payment_type"
                className="custom-control-input"
                onChange={checkoutInputHandler}
                value="cash_on_delivery"
                checked={
                  checkoutData.payment_type === "cash_on_delivery"
                    ? true
                    : false
                }
              />
              <label
                className="custom-control-label"
                htmlFor="cash_on_delivery"
              >
                Cash on Delivery
              </label>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const termsAndConditionCheckMark = () => {
    return (
      <div className="form-checkbox mt-4 mb-5">
        <input
          type="checkbox"
          className="custom-checkbox"
          id="terms-condition"
          name="terms_condition"
          onChange={inputHandlerTerms}
          // value={checkoutData.terms_condition}
          checked={checkoutData.terms_condition ? true : false}
          onClick={() =>
            checkoutError.termsConditionError &&
            setCheckoutError({
              ...checkoutError,
              termsConditionError: "",
            })
          }
        />
        <label className="form-control-label" htmlFor="terms-condition">
          I have read and agree to the website{" "}
          <Link href="/terms_and_condition">terms and conditions</Link>*
        </label>
        <div
          style={{
            display: checkoutError.termsConditionError ? "block" : "none",
            fontSize: "80%",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {checkoutError.termsConditionError
            ? checkoutError.termsConditionError
            : ""}
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <Head>
        <title>Checkout | The Owlet</title>
      </Head>
      <main className="main checkout">
        <div className="page-content pt-7 pb-10 mb-10">
          <div className="container mt-7">
            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                  {userBillingAddress()}
                  {shipToDifferentAddress()}
                </div>
                <aside className="col-lg-5 sticky-sidebar-wrapper">
                  <div
                    className="sticky-sidebar mt-1"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5">
                      <h3 className="title title-simple text-left text-uppercase">
                        Your Order
                      </h3>
                      {orderDetailsWithShippingCost()}
                      {paymentMethods()}
                      {termsAndConditionCheckMark()}
                      {!placeOrderButtonStatus ? (
                        <button
                          type="submit"
                          className="btn btn-dark btn-rounded btn-order"
                        >
                          Place Order
                        </button>
                      ) : (
                        <button className="btn btn-disabled btn-rounded btn-order">
                          Processing Order...
                        </button>
                      )}
                      <ToastContainer />
                    </div>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  // Receving loction
  const locations = await CheckoutService.instance.getLocationList();

  const shippingCostInDhaka =
    await CheckoutService.instance.getInDhakaShippingCharge();

  const shippingCostOutDhaka =
    await CheckoutService.instance.getOutDhakaShippingCharge();

  return {
    props: {
      locations,
      shippingCostInDhaka,
      shippingCostOutDhaka,
    },
    // revalidate: 10,
  };
};
export default index;
