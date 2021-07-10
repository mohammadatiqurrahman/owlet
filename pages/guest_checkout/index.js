import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../../context/cart_context";
import { useUserContext } from "../../context/user_context";
import Head from "next/head";
import { based_url } from "../../utils/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import LoginForCheckout from "../../components/checkout/LoginForCheckout";
import SignUpForCheckout from "../../components/checkout/SignUpForCheckout";
import GuestInvoice from "../../models/invoice_guest";
import CheckoutService from "../../services/CheckoutService";
const index = ({ locations, inDhaka, outDhaka }) => {
  const router = useRouter();

  const { cart, total_amount, total_tax, setPlaceOrderClick } =
    useCartContext();
  const [placeOrderButtonStatus, setPlaceOrderButtonStatus] = useState(false);

  // Preparing products for database
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

  // Check Terms and condition, before sumbit order
  const inputHandlerTerms = () => {
    setCheckoutData({
      ...checkoutData,
      terms_condition: !checkoutData.terms_condition,
    });
  };

  // Input error management
  const [checkoutError, setCheckoutError] = useState({
    fullNameError: "",
    emailError: "",
    phoneError: "",
    locationError: "",
    areaError: "",
    zipError: "",
    addressError: "",
    shippingCostError: "",
    termsConditionError: "",
  });

  // Storing input fields start
  const [checkoutData, setCheckoutData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    area: "",
    zip: "",
    address: "",
    shipping_cost: inDhaka,

    terms_condition: false,
    payment_type: "cash_on_delivery",
  });

  const checkoutInputHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setCheckoutData({ ...checkoutData, [name]: value });
  };
  // Storing input fields end

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlaceOrderButtonStatus(true);
    if (
      !checkoutData.fullName ||
      !checkoutData.email ||
      !checkoutData.phone ||
      !checkoutData.location ||
      !checkoutData.area ||
      !checkoutData.zip ||
      !checkoutData.address ||
      !checkoutData.shipping_cost ||
      !checkoutData.terms_condition ||
      !checkoutData.payment_type
    ) {
      setPlaceOrderButtonStatus(false);
      setCheckoutError({
        ...checkoutError,
        fullNameError: checkoutData.fullName
          ? ""
          : "The Full Name field is required.",
        emailError: checkoutData.email ? "" : "The Email field is required.",
        phoneError: checkoutData.phone ? "" : "The Phone field is required.",
        locationError: checkoutData.location
          ? ""
          : "The Location field is required.",
        areaError: checkoutData.area ? "" : "The Area field is required.",
        zipError: checkoutData.zip ? "" : "The Zip field is required.",
        addressError: checkoutData.address
          ? ""
          : "The Address field is required.",
        shippingCostError: checkoutData.shipping_cost
          ? ""
          : "The Shipping cost field is required.",
        termsConditionError: checkoutData.terms_condition
          ? ""
          : "Please click on the checkbox before placing order.",
      });
      return;
    }
    const guest_invoice = new GuestInvoice(
      checkoutData.fullName,
      checkoutData.email,
      checkoutData.phone,
      checkoutData.location,
      checkoutData.area,
      checkoutData.zip,
      checkoutData.address,
      JSON.stringify(products),
      total_tax,
      checkoutData.shipping_cost,
      total_amount + total_tax + parseInt(checkoutData.shipping_cost),
      checkoutData.payment_type
    );

    const orderResponse = await CheckoutService.instance.guestCheckout(
      guest_invoice
    );
    setPlaceOrderClick(orderResponse);
    router.push("/order");
    setPlaceOrderButtonStatus(false);
  };

  // Show and hide Login/Registration field start
  const [loginForm, setLoginForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const handleLoginForm = () => {
    if (loginForm) {
      setLoginForm(false);
    } else {
      setLoginForm(true);
    }
  };

  const handleSignUpForm = () => {
    if (signUpForm) {
      setSignUpForm(false);
    } else {
      setSignUpForm(true);
    }
  };
  // Show and hide Login/Registration field end

  // Location wise Areas start
  const [areas, setAreas] = useState([]);
  const getAreas = async () => {
    if (checkoutData.location) {
      const areaRes = await fetch(
        `${based_url}/location/${checkoutData.location}/area/list`
      );
      const areas = await areaRes.json();
      setAreas(areas);
    }
  };
  useEffect(() => {
    getAreas();
  }, [checkoutData.location]);
  // Location wise Areas end

  return (
    <React.Fragment>
      <Head>
        <title>Checkout | The Owlet</title>
      </Head>
      <main className="main checkout">
        <div className="page-content pt-7 pb-10 mb-10">
          <div className="container mt-7">
            <div>
              {/* Login in */}
              <LoginForCheckout
                handleLoginForm={handleLoginForm}
                loginForm={loginForm}
              />
              {/* Signup */}
              <SignUpForCheckout
                locations={locations}
                handleSignUpForm={handleSignUpForm}
                signUpForm={signUpForm}
              />
            </div>

            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 pr-lg-4">
                  <h3 className="title title-simple text-left text-uppercase">
                    Billing Details
                  </h3>
                  <div className="row">
                    <div className="col-xs-6">
                      <label className="mt-3">Full Name *</label>
                      <input
                        type="text"
                        className="form-control mb-0"
                        name="fullName"
                        id="fullName"
                        onChange={checkoutInputHandler}
                        value={checkoutData.fullName}
                        onKeyUp={() =>
                          checkoutError.fullNameError &&
                          setCheckoutError({
                            ...checkoutError,
                            fullNameError: "",
                          })
                        }
                      />
                      <div
                        style={{
                          display: checkoutError.fullNameError
                            ? "block"
                            : "none",
                          fontSize: "80%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {checkoutError.fullNameError
                          ? checkoutError.fullNameError
                          : ""}
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <label className="mt-3">Email Address *</label>
                      <input
                        type="email"
                        className="form-control mb-0"
                        name="email"
                        id="email"
                        onChange={checkoutInputHandler}
                        value={checkoutData.email}
                        onKeyUp={() =>
                          checkoutError.emailError &&
                          setCheckoutError({
                            ...checkoutError,
                            emailError: "",
                          })
                        }
                      />
                      <div
                        style={{
                          display: checkoutError.emailError ? "block" : "none",
                          fontSize: "80%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {checkoutError.emailError
                          ? checkoutError.emailError
                          : ""}
                      </div>
                    </div>
                  </div>

                  {/* <label>Country / Region *</label>
                <div className="select-box">
                  <select name="country" className="form-control">
                    <option value="us" selected>
                      United States (US)
                    </option>
                    <option value="uk"> United Kingdom</option>
                    <option value="fr">France</option>
                    <option value="aus">Austria</option>
                  </select>
                </div> */}
                  <label className="mt-3">Address *</label>
                  <textarea
                    type="text"
                    className="form-control mb-0"
                    name="address"
                    placeholder="House number and street name"
                    id="address"
                    onChange={checkoutInputHandler}
                    value={checkoutData.address}
                    onKeyUp={() =>
                      checkoutError.addressError &&
                      setCheckoutError({
                        ...checkoutError,
                        addressError: "",
                      })
                    }
                  ></textarea>
                  <div
                    style={{
                      display: checkoutError.addressError ? "block" : "none",
                      fontSize: "80%",
                      color: " #cb2431",
                      marginLeft: "5px",
                    }}
                  >
                    {checkoutError.addressError
                      ? checkoutError.addressError
                      : ""}
                  </div>

                  <div className="row">
                    <div className="col-xs-6">
                      <label className="mt-3">Location *</label>

                      <select
                        className="form-control mb-0"
                        name="location"
                        onChange={checkoutInputHandler}
                        value={checkoutData.location}
                        onClick={() =>
                          checkoutError.locationError &&
                          setCheckoutError({
                            ...checkoutError,
                            locationError: "",
                          })
                        }
                      >
                        <option>Select Location</option>
                        {locations.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <div
                        style={{
                          display: checkoutError.locationError
                            ? "block"
                            : "none",
                          fontSize: "80%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {checkoutError.locationError
                          ? checkoutError.locationError
                          : ""}
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <label className="mt-3">Area *</label>
                      {areas.length > 0 ? (
                        <select
                          className="form-control mb-0"
                          name="area"
                          onChange={checkoutInputHandler}
                          value={checkoutData.area}
                          onClick={() =>
                            checkoutError.areaError &&
                            setCheckoutError({
                              ...checkoutError,
                              areaError: "",
                            })
                          }
                        >
                          {areas.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <select
                          className="form-control mb-0"
                          disabled
                          style={{ backgroundColor: "#e2e2e2" }}
                        ></select>
                      )}

                      <div
                        style={{
                          display: checkoutError.areaError ? "block" : "none",
                          fontSize: "80%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {checkoutError.areaError ? checkoutError.areaError : ""}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <label className="mt-3">ZIP *</label>
                      <input
                        type="text"
                        className="form-control mb-0"
                        name="zip"
                        onChange={checkoutInputHandler}
                        value={checkoutData.zip}
                        onKeyUp={() =>
                          checkoutError.zipError &&
                          setCheckoutError({
                            ...checkoutError,
                            zipError: "",
                          })
                        }
                      />
                      <div
                        style={{
                          display: checkoutError.zipError ? "block" : "none",
                          fontSize: "80%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {checkoutError.zipError ? checkoutError.zipError : ""}
                      </div>
                    </div>
                    <div className="col-xs-6">
                      <label className="mt-3">Phone *</label>
                      <input
                        type="text"
                        className="form-control mb-0"
                        name="phone"
                        onChange={checkoutInputHandler}
                        value={checkoutData.phone}
                        onKeyUp={() =>
                          checkoutError.phoneError &&
                          setCheckoutError({
                            ...checkoutError,
                            phoneError: "",
                          })
                        }
                      />
                      <div
                        style={{
                          display: checkoutError.phoneError ? "block" : "none",
                          fontSize: "80%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {checkoutError.phoneError
                          ? checkoutError.phoneError
                          : ""}
                      </div>
                    </div>
                  </div>
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
                              const { amount, name, size, color, tax, price } =
                                item;
                              return (
                                <tr key={index}>
                                  <td className="product-name">
                                    {name}{" "}
                                    <span className="product-quantity">
                                      ×&nbsp;{amount}
                                    </span>
                                  </td>
                                  <td className="product-total text-body">
                                    BDT {amount * price}.00
                                  </td>
                                </tr>
                              );
                            })}

                          <tr>
                            <td className="product-name">Tax </td>
                            <td className="product-total text-body">
                              BDT {total_tax}.00
                            </td>
                          </tr>
                          <tr>
                            <td className="product-name">Shipping Cost </td>
                            <td className="product-total text-body">
                              BDT {Math.round(checkoutData.shipping_cost)}.00
                            </td>
                          </tr>
                          <tr className="sumnary-shipping shipping-row-last">
                            <td colSpan="2">
                              <h4 className="summary-subtitle">
                                Shipping Cost
                              </h4>
                              <ul>
                                <li>
                                  <div className="custom-radio">
                                    <input
                                      type="radio"
                                      id="flat_rate"
                                      name="shipping_cost"
                                      className="custom-control-input"
                                      onChange={checkoutInputHandler}
                                      value={inDhaka}
                                      checked={
                                        checkoutData.shipping_cost === inDhaka
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="flat_rate"
                                    >
                                      Inside Dhaka - BDT {parseInt(inDhaka)}.00
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
                                      value={outDhaka}
                                      checked={
                                        checkoutData.shipping_cost === outDhaka
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor="free-shipping"
                                    >
                                      Outside Dhaka - BDT {parseInt(outDhaka)}
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
                          {/* <tr className="summary-subtotal">
                          <td>
                            <h4 className="summary-subtitle">Subtotal</h4>
                          </td>
                          <td className="summary-subtotal-price pb-0 pt-0">
                            $290.00
                          </td>
                        </tr> */}

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
                      <div className="payment accordion">
                        <h4 className="summary-subtitle ls-m pb-3">
                          Payment Methods
                        </h4>
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
                                  checkoutData.payment_type === "online_payment"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="online_payment"
                              >
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
                                  checkoutData.payment_type ===
                                  "cash_on_delivery"
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
                        <label
                          className="form-control-label"
                          htmlFor="terms-condition"
                        >
                          I have read and agree to the website{" "}
                          <Link href="/terms_and_condition">
                            terms and conditions
                          </Link>
                          *
                        </label>
                        <div
                          style={{
                            display: checkoutError.termsConditionError
                              ? "block"
                              : "none",
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
  const locationRes = await fetch(`${based_url}/location/list`);
  const locations = await locationRes.json();

  const inDhakaRes = await fetch(`${based_url}/setting/charge/inside_dhaka`);
  const inDhaka = await inDhakaRes.json();

  const outDhakaRes = await fetch(`${based_url}/setting/charge/outside_dhaka`);
  const outDhaka = await outDhakaRes.json();

  return {
    props: {
      locations,
      inDhaka,
      outDhaka,
    },
    // revalidate: 10,
  };
};
export default index;