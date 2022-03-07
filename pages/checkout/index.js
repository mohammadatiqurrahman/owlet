import React, { useEffect, useState } from "react";
import { useCartContext } from "../../context/cart_context";
import { useUserContext } from "../../context/user_context";
import Head from "next/head";
import { based_url } from "../../utils/constants";
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
  const { cart, clearCart, total_amount, total_tax, setPlaceOrderClick } =
    useCartContext();

  const [placeOrderButtonStatus, setPlaceOrderButtonStatus] = useState(false);
  const [noteStatus, setNoteStatus] = useState(false);
  const [selectShippingArea, setSelectShippingArea] = useState("");

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
      tax: item.tax,
      subtotal: item.amount * item.price,
    };
  });

  // Input handler and Error management start
  const inputHandlerTerms = (e) => {
    setCheckoutData({
      ...checkoutData,
      terms_condition: !checkoutData.terms_condition,
    });
  };

  const inputHandlerAgreeWithDiffrentAddress = () => {
    setCheckoutData({
      ...checkoutData,
      agreeWithDiffrentAddress: !checkoutData.agreeWithDiffrentAddress,
    });
  };

  const [checkoutError, setCheckoutError] = useState({
    shippingCostError: "",
    termsConditionError: "",
    agreeWithDiffrentAddressError: "",
    diff_name_error: "",
    diff_email_error: "",
    diff_phone_error: "",
    diff_address_error: "",
    diff_location_id_error: "",
    diff_area_id_error: "",
    diff_zip_error: "",
  });

  const [checkoutData, setCheckoutData] = useState({
    shipping_cost: 0,
    terms_condition: false,
    payment_type: "cash_on_delivery",
    diff_name: "",
    diff_email: "",
    diff_phone: "",
    diff_address: "",
    diff_location_id: "",
    diff_area_id: "",
    diff_zip: "",
    agreeWithDiffrentAddress: false,
    note: "",
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
      !checkoutData.payment_type ||
      (shipToDifferent && !checkoutData.diff_name) ||
      (shipToDifferent && !checkoutData.diff_email) ||
      (shipToDifferent && !checkoutData.diff_phone) ||
      (shipToDifferent && !checkoutData.diff_address) ||
      (shipToDifferent && !checkoutData.diff_location_id) ||
      (shipToDifferent && !checkoutData.diff_area_id) ||
      (shipToDifferent && !checkoutData.diff_zip) ||
      (shipToDifferent && checkoutData.agreeWithDiffrentAddress === false)
    ) {
      setPlaceOrderButtonStatus(false);
      if (
        (shipToDifferent && !checkoutData.diff_name) ||
        (shipToDifferent && !checkoutData.diff_email) ||
        (shipToDifferent && !checkoutData.diff_phone) ||
        (shipToDifferent && !checkoutData.diff_address) ||
        (shipToDifferent && !checkoutData.diff_location_id) ||
        (shipToDifferent && !checkoutData.diff_area_id) ||
        (shipToDifferent && !checkoutData.diff_zip) ||
        (shipToDifferent && checkoutData.agreeWithDiffrentAddress === false)
      ) {
        setCheckoutError({
          ...checkoutError,
          diff_name_error: checkoutData.diff_name
            ? ""
            : "The full name field is required.",
          diff_email_error: checkoutData.diff_email
            ? ""
            : "The email field is required.",
          diff_phone_error: checkoutData.diff_phone
            ? ""
            : "The phone field is required.",
          diff_address_error: checkoutData.diff_address
            ? ""
            : "The address field is required.",
          diff_location_id_error: checkoutData.diff_location_id
            ? ""
            : "The city field is required.",
          diff_area_id_error: checkoutData.diff_area_id
            ? ""
            : "The area field is required.",
          diff_zip_error: checkoutData.diff_zip
            ? ""
            : "The zip field is required.",
          agreeWithDiffrentAddressError: checkoutData.agreeWithDiffrentAddress
            ? ""
            : "Please click on the checkbox for agree with diffrent shippin address",
          shippingCostError: checkoutData.shipping_cost
            ? ""
            : "The shipping cost field is required.",
          termsConditionError: checkoutData.terms_condition
            ? ""
            : "Please click on the checkbox before placing order",
        });

        return;
      }
      setCheckoutError({
        ...checkoutError,
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
      // checkoutData.ship_to_different,
      checkoutData.payment_type,
      checkoutData.note,

      checkoutData.diff_name,
      checkoutData.diff_email,
      checkoutData.diff_phone,
      checkoutData.diff_address,
      checkoutData.diff_location_id,
      checkoutData.diff_area_id,
      checkoutData.diff_zip
    );

    const orderResponse = await CheckoutService.instance.registeredUserCheckout(
      invoice,
      user
    );

    setPlaceOrderClick(orderResponse);
    // clearCart();
    router.push("/order");
    setPlaceOrderButtonStatus(false);
  };

  // Location wise Areas start
  const [areas, setAreas] = useState([]);
  const [areaStatus, setAreaStatus] = useState(false);
  const getAreas = async () => {
    if (checkoutData.diff_location_id) {
      setAreaStatus(true);
      const areaRes = await fetch(
        `${based_url}/location/${checkoutData.diff_location_id}/area/list`
      );
      const areas = await areaRes.json();
      setAreaStatus(false);
      setAreas(areas);
      const selectedAreaForShippingCost = locations.find(
        (item) => item.id == checkoutData.diff_location_id
      );
      setSelectShippingArea(selectedAreaForShippingCost.name);
    }
  };
  useEffect(() => {
    getAreas();
  }, [checkoutData.diff_location_id]);
  // Location wise Areas end

  useEffect(() => {
    if (selectShippingArea) {
      setCheckoutData({
        ...checkoutData,
        shipping_cost:
          selectShippingArea == "Dhaka"
            ? shippingCostInDhaka
            : shippingCostOutDhaka,
      });
    }
    if (user && !selectShippingArea) {
      const userLocationShippingCost = locations.find(
        (item) => item.id == user.customer.location_id
      );
      setSelectShippingArea(userLocationShippingCost.name);
      // setCheckoutData({
      //   ...checkoutData,
      //   shipping_cost:
      //     userLocationShippingCost.name == "Dhaka"
      //       ? shippingCostInDhaka
      //       : shippingCostOutDhaka,
      // });
    }
  }, [selectShippingArea, user]);

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
              setShipToDifferent(!shipToDifferent);
              setCheckoutData({
                ...checkoutData,
                diff_name: "",
                diff_email: "",
                diff_phone: "",
                diff_address: "",
                diff_location_id: "",
                diff_area_id: "",
                diff_zip: "",
              });
              setCheckoutError({
                ...checkoutError,
                agreeWithDiffrentAddressError: "",
                diff_name_error: "",
                diff_email_error: "",
                diff_phone_error: "",
                diff_address_error: "",
                diff_location_id_error: "",
                diff_area_id_error: "",
                diff_zip_error: "",
              });
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
              <h3 className="title title-simple text-left text-uppercase mt-2">
                Shipping Details
              </h3>
              <div className="row">
                <div className="col-xs-6">
                  <label>First Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="diff_name"
                    onChange={checkoutInputHandler}
                    value={checkoutData.diff_name}
                    onKeyUp={() =>
                      checkoutError.diff_name_error &&
                      setCheckoutError({
                        ...checkoutError,
                        diff_name_error: "",
                      })
                    }
                  />
                  <div
                    style={{
                      display: checkoutError.diff_name_error ? "block" : "none",
                      fontSize: "80%",
                      color: " #cb2431",
                      marginLeft: "5px",
                    }}
                  >
                    {checkoutError.diff_name_error
                      ? checkoutError.diff_name_error
                      : ""}
                  </div>
                </div>
                <div className="col-xs-6">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="diff_email"
                    onChange={checkoutInputHandler}
                    value={checkoutData.diff_email}
                    onKeyUp={() =>
                      checkoutError.diff_email_error &&
                      setCheckoutError({
                        ...checkoutError,
                        diff_email_error: "",
                      })
                    }
                  />
                  <div
                    style={{
                      display: checkoutError.diff_email_error
                        ? "block"
                        : "none",
                      fontSize: "80%",
                      color: " #cb2431",
                      marginLeft: "5px",
                    }}
                  >
                    {checkoutError.diff_email_error
                      ? checkoutError.diff_email_error
                      : ""}
                  </div>
                </div>
              </div>
              <label className="mt-3">Address *</label>
              <textarea
                type="text"
                className="form-control mb-0"
                name="diff_address"
                placeholder="House number and street name"
                onChange={checkoutInputHandler}
                value={checkoutData.diff_address}
                onKeyUp={() =>
                  checkoutError.diff_address_error &&
                  setCheckoutError({
                    ...checkoutError,
                    diff_address_error: "",
                  })
                }
              ></textarea>
              <div
                style={{
                  display: checkoutError.diff_address_error ? "block" : "none",
                  fontSize: "80%",
                  color: " #cb2431",
                  marginLeft: "5px",
                }}
              >
                {checkoutError.diff_address_error
                  ? checkoutError.diff_address_error
                  : ""}
              </div>
              <div className="row">
                <div className="col-xs-6">
                  <label className="mt-3">City *</label>

                  <select
                    className="form-control mb-0"
                    name="diff_location_id"
                    onChange={checkoutInputHandler}
                    value={checkoutData.diff_location_id}
                    onClick={() =>
                      checkoutError.diff_location_id_error &&
                      setCheckoutError({
                        ...checkoutError,
                        diff_location_id_error: "",
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
                      display: checkoutError.diff_location_id_error
                        ? "block"
                        : "none",
                      fontSize: "80%",
                      color: " #cb2431",
                      marginLeft: "5px",
                    }}
                  >
                    {checkoutError.diff_location_id_error
                      ? checkoutError.diff_location_id_error
                      : ""}
                  </div>
                </div>
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
                      name="diff_area_id"
                      onChange={checkoutInputHandler}
                      value={checkoutData.diff_area_id}
                      onClick={() =>
                        checkoutError.diff_area_id_error &&
                        setCheckoutError({
                          ...checkoutError,
                          diff_area_id_error: "",
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
                      display: checkoutError.diff_area_id_error
                        ? "block"
                        : "none",
                      fontSize: "80%",
                      color: " #cb2431",
                      marginLeft: "5px",
                    }}
                  >
                    {checkoutError.diff_area_id_error
                      ? checkoutError.diff_area_id_error
                      : ""}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-6">
                  <label className="mt-3">ZIP *</label>
                  <input
                    type="text"
                    className="form-control mb-0"
                    name="diff_zip"
                    onChange={checkoutInputHandler}
                    value={checkoutData.diff_zip}
                    onKeyUp={() =>
                      checkoutError.diff_zip_error &&
                      setCheckoutError({
                        ...checkoutError,
                        diff_zip_error: "",
                      })
                    }
                  />
                  <div
                    style={{
                      display: checkoutError.diff_zip_error ? "block" : "none",
                      fontSize: "80%",
                      color: " #cb2431",
                      marginLeft: "5px",
                    }}
                  >
                    {checkoutError.diff_zip_error
                      ? checkoutError.diff_zip_error
                      : ""}
                  </div>
                </div>
                <div className="col-xs-6">
                  <label className="mt-3">Phone *</label>
                  <input
                    type="text"
                    className="form-control mb-0"
                    name="diff_phone"
                    onChange={checkoutInputHandler}
                    value={checkoutData.diff_phone}
                    onKeyUp={() =>
                      checkoutError.diff_phone_error &&
                      setCheckoutError({
                        ...checkoutError,
                        diff_phone_error: "",
                      })
                    }
                  />
                  <div
                    style={{
                      display: checkoutError.diff_phone_error
                        ? "block"
                        : "none",
                      fontSize: "80%",
                      color: " #cb2431",
                      marginLeft: "5px",
                    }}
                  >
                    {checkoutError.diff_phone_error
                      ? checkoutError.diff_phone_error
                      : ""}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  id="agreeWithDiffrentAddress"
                  name="agreeWithDiffrentAddress"
                  onChange={inputHandlerAgreeWithDiffrentAddress}
                  checked={checkoutData.agreeWithDiffrentAddress ? true : false}
                  onClick={() =>
                    checkoutError.agreeWithDiffrentAddressError &&
                    setCheckoutError({
                      ...checkoutError,
                      agreeWithDiffrentAddressError: "",
                    })
                  }
                />
                <label
                  className="form-control-label font-weight-bold"
                  style={{ color: "black" }}
                  htmlFor="agreeWithDiffrentAddress"
                >
                  I agree with different address
                </label>
                <div
                  style={{
                    display: checkoutError.agreeWithDiffrentAddressError
                      ? "block"
                      : "none",
                    fontSize: "80%",
                    color: " #cb2431",
                    marginLeft: "5px",
                  }}
                >
                  {checkoutError.agreeWithDiffrentAddressError
                    ? checkoutError.agreeWithDiffrentAddressError
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const writeNote = () => {
    return (
      <div className="card accordion mt-3">
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
          {/* <tr>
            <td className="product-name">Shipping Cost </td>
            <td className="product-total text-body">
              BDT {Math.round(checkoutData.shipping_cost)}.00
            </td>
          </tr> */}
          <tr
            className="sumnary-shipping"
            style={{
              display:
                selectShippingArea || checkoutData.shipping_cost
                  ? "block"
                  : "none",
            }}
          >
            <td colSpan="2">
              <h4 className="summary-subtitle">Shipping Cost</h4>
              <ul>
                <li
                  style={{
                    display:
                      selectShippingArea == "Dhaka" &&
                      parseInt(shippingCostInDhaka) !== 0
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

                {/* Outside dhaka shipping  */}
                <li
                  style={{
                    display:
                      selectShippingArea !== "Dhaka" &&
                      parseInt(shippingCostOutDhaka) !== 0
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

                {/* Free shipping  */}
                <li
                  style={{
                    display:
                      (selectShippingArea == "Dhaka" &&
                        shippingCostInDhaka == 0) ||
                      (selectShippingArea !== "Dhaka" &&
                        shippingCostOutDhaka == 0)
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

export const getServerSideProps = async () => {
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
