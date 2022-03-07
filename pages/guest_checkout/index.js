import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../../context/cart_context";
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
  const [areaStatus, setAreaStatus] = useState(false);
  const { cart, clearCart, total_amount, total_tax, setPlaceOrderClick } =
    useCartContext();
  const [placeOrderButtonStatus, setPlaceOrderButtonStatus] = useState(false);
  const [noteStatus, setNoteStatus] = useState(false);
  const [selectShippingArea, setSelectShippingArea] = useState("");

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
      tax: item.tax,
      subtotal: item.amount * item.price,
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
    shipping_cost: 0,
    // shipping_cost: selectShippingArea == "Dhaka" ? inDhaka : outDhaka,
    terms_condition: false,
    payment_type: "cash_on_delivery",
    note: "",
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
    const emailValidation = () => {
      var mailformat =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (checkoutData.email.match(mailformat)) {
        return true;
      } else {
        return false;
      }
    };
    const email = emailValidation();

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
      !checkoutData.payment_type ||
      `${checkoutData.phone}`.length !== 11 ||
      !email
    ) {
      setPlaceOrderButtonStatus(false);
      setCheckoutError({
        ...checkoutError,
        fullNameError: checkoutData.fullName
          ? ""
          : "The Full Name field is required.",
        emailError:
          (checkoutData.email ? "" : "The Email field is required.") ||
          (checkoutData.email !== "" && !email
            ? "Enter valid email address"
            : ""),
        phoneError:
          (checkoutData.phone ? "" : "The Phone field is required.") ||
          (checkoutData.phone !== "" && `${checkoutData.phone}`.length !== 11
            ? "Phone number must be 11 digits"
            : ""),
        locationError: checkoutData.location
          ? ""
          : "The City field is required.",
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
      checkoutData.payment_type,
      checkoutData.note
    );

    const orderResponse = await CheckoutService.instance.guestCheckout(
      guest_invoice
    );
    setPlaceOrderClick(orderResponse);
    router.push("/order");
    setPlaceOrderButtonStatus(false);
    // clearCart();
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
      setAreaStatus(true);
      const areaRes = await fetch(
        `${based_url}/location/${checkoutData.location}/area/list`
      );
      const areas = await areaRes.json();
      setAreaStatus(false);
      setAreas(areas);
      const selectedAreaForShippingCost = locations.find(
        (item) => item.id == checkoutData.location
      );
      setSelectShippingArea(selectedAreaForShippingCost.name);
    }
  };
  useEffect(() => {
    getAreas();
  }, [checkoutData.location]);
  // Location wise Areas end

  useEffect(() => {
    if (selectShippingArea) {
      setCheckoutData({
        ...checkoutData,
        shipping_cost: selectShippingArea == "Dhaka" ? inDhaka : outDhaka,
      });
    }
  }, [selectShippingArea]);

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

  const writeNote = () => {
    return (
      <div className="card accordion mt-5">
        <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
          <i className="fas fa-exclamation-circle"></i>

          <a
            className="text-primary collapse font-weight-bold"
            onClick={() => {
              setCheckoutData({
                ...checkoutData,
                note: "",
              });
              setNoteStatus(!noteStatus);
            }}
          >
            Write a note (Optional)
          </a>
          <div
            className="alert-body collapsed"
            id="alert-body1"
            style={{ display: noteStatus ? "block" : "none" }}
          >
            <div className="col-lg-12 mb-6 mb-lg-0 pr-lg-4 mt-4">
              <textarea
                className="form-control pb-2 pt-2 mb-0"
                cols="30"
                rows="5"
                type="text"
                name="note"
                onChange={checkoutInputHandler}
                value={checkoutData.note}
                placeholder="Write a note (Optional)"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const nameField = () => {
    return (
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
            display: checkoutError.fullNameError ? "block" : "none",
            fontSize: "80%",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {checkoutError.fullNameError ? checkoutError.fullNameError : ""}
        </div>
      </div>
    );
  };

  const emailField = () => {
    return (
      <div className="col-xs-6">
        <label className="mt-3">Email Address *</label>
        <input
          // type="email"
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
          {checkoutError.emailError ? checkoutError.emailError : ""}
        </div>
      </div>
    );
  };

  const addressField = () => {
    return (
      <>
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
          {checkoutError.addressError ? checkoutError.addressError : ""}
        </div>
      </>
    );
  };

  const locationField = () => {
    return (
      <div className="col-xs-6">
        <label className="mt-3">City *</label>

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
          <option>Select City</option>
          {locations.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div
          style={{
            display: checkoutError.locationError ? "block" : "none",
            fontSize: "80%",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {checkoutError.locationError ? checkoutError.locationError : ""}
        </div>
      </div>
    );
  };

  const areaField = () => {
    return (
      <div className="col-xs-6">
        <label className="mt-3">Area *</label>
        {areaStatus ? (
          <select
            className="form-control mb-0"
            disabled
            style={{ backgroundColor: "#e2e2e2" }}
          >
            <option>Finding area...</option>
          </select>
        ) : areas.length > 0 ? (
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
    );
  };

  const zipField = () => {
    return (
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
    );
  };

  const phoneField = () => {
    return (
      <div className="col-xs-6">
        <label className="mt-3">Phone *</label>
        <input
          type="number"
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
          {checkoutError.phoneError ? checkoutError.phoneError : ""}
        </div>
      </div>
    );
  };

  const orderedProductWithShippingCost = () => {
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
          {/* <tr style={{ display: selectShippingArea ? "block" : "none" }}>
            <td className="product-name">Shipping Cost </td>
            <td className="product-total text-body">
              BDT {Math.round(checkoutData.shipping_cost)}.00
            </td>
          </tr> */}
          <tr
            className="sumnary-shipping"
            style={{ display: selectShippingArea ? "block" : "none" }}
          >
            <td colSpan="2">
              <h4 className="summary-subtitle">Shipping Cost</h4>
              <ul>
                <li
                  style={{
                    display:
                      selectShippingArea == "Dhaka" && parseInt(inDhaka) !== 0
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="flat_rate"
                      name="shipping_cost"
                      className="custom-control-input"
                      onChange={checkoutInputHandler}
                      value={inDhaka}
                      checked={
                        checkoutData.shipping_cost === inDhaka ? true : false
                      }
                    />
                    <label className="custom-control-label" htmlFor="flat_rate">
                      Inside Dhaka - BDT {parseInt(inDhaka)}.00
                    </label>
                  </div>
                </li>

                {/* Outside Dhaka shipping */}
                <li
                  style={{
                    display:
                      selectShippingArea !== "Dhaka" && parseInt(outDhaka) !== 0
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="free-shipping"
                      name="shipping_cost"
                      className="custom-control-input"
                      onChange={checkoutInputHandler}
                      value={outDhaka}
                      checked={
                        checkoutData.shipping_cost === outDhaka ? true : false
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

                {/* Free shipping  */}
                <li
                  style={{
                    display:
                      (selectShippingArea == "Dhaka" && inDhaka == 0) ||
                      (selectShippingArea !== "Dhaka" && outDhaka == 0)
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="custom-radio">
                    <input
                      type="radio"
                      id="local_pickup"
                      name="shipping_cost"
                      className="custom-control-input"
                      onChange={checkoutInputHandler}
                      value={0}
                      required
                      checked={checkoutData.shipping_cost == 0 ? true : false}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="local_pickup"
                    >
                      Free Shipping!
                    </label>
                  </div>
                </li>
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

  const selectPaymentType = () => {
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

  const termsAndConditionField = () => {
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
      <ToastContainer />
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
                    {nameField()}
                    {emailField()}
                  </div>

                  {addressField()}

                  <div className="row">
                    {locationField()}
                    {areaField()}
                  </div>
                  <div className="row">
                    {zipField()}
                    {phoneField()}
                  </div>
                  {writeNote()}
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
                      {orderedProductWithShippingCost()}
                      {selectPaymentType()}
                      {termsAndConditionField()}
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

export const getServerSideProps = async () => {
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
