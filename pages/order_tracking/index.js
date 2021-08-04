import React, { useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OrderTrackingService from "../../services/OrderTrackingService";
const index = () => {
  // Input fields
  const [order, setOrder] = useState({
    orderNumber: "",
  });
  // Input error handler
  const [orderError, setOrderError] = useState({
    orderNumberError: "",
  });

  const [buttonStatus, setButtonStatus] = useState(false);

  const [invoice, setInvoice] = useState(null);

  // Storing form input
  const orderInputHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setOrder({ ...order, [name]: value });
  };

  // Submit form
  const orderHandler = async (e) => {
    e.preventDefault();
    setButtonStatus(true);
    if (!order.orderNumber) {
      setButtonStatus(false);
      setOrderError({
        ...orderError,
        orderNumberError: order.orderNumber
          ? ""
          : "The Invoice Number is required.",
      });
      return;
    }

    const orderResponse = await OrderTrackingService.instance.getOrderStatus(
      order
    );

    setButtonStatus(false);
    setInvoice(orderResponse);
    if (!orderResponse) {
      toast.error("Order not found!");
      return;
    }
    setOrder({
      ...order,
      orderNumber: "",
    });
  };

  // Order Result
  const orderResult = () => {
    return (
      <div className="order-results">
        <div className="overview-item">
          <span>Order number:</span>
          <strong>{invoice.reference}</strong>
        </div>
        <div className="overview-item">
          <span>Status:</span>
          <strong>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </strong>
        </div>
        <div className="overview-item">
          <span>Date:</span>
          <strong>{invoice.date}</strong>
        </div>

        <div className="overview-item">
          <span>Total:</span>
          <strong>BDT {invoice.total}</strong>
        </div>
        <div className="overview-item">
          <span>Payment method:</span>
          <strong>
            {invoice.payment_method === "cash_on_delivery"
              ? "Cash On Delivery"
              : "Online Payment"}
          </strong>
        </div>
      </div>
    );
  };
  // Order Details
  const orderDetails = () => {
    return (
      <>
        <h2 className="title title-simple text-left pt-4 font-weight-bold text-uppercase">
          Order Details
        </h2>
        <div className="order-details">
          <table className="order-details-table">
            <thead>
              <tr className="summary-subtotal">
                <td>
                  <h3 className="summary-subtitle">Product</h3>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(invoice.products).map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="product-name mr-2">
                      {item.name} - {item.color} - {item.size} x {item.quantity}
                    </td>
                    <td className="product-price">BDT {item.price}</td>
                  </tr>
                );
              })}

              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Shipping Cost:</h4>
                </td>
                <td className="summary-subtotal-price">
                  {invoice.shipping_cost}
                </td>
              </tr>
              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Tax:</h4>
                </td>
                <td className="summary-subtotal-price">{invoice.tax}</td>
              </tr>
              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Total:</h4>
                </td>
                <td>
                  <p className="summary-total-price">BDT {invoice.total}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  // Billing Address
  const billingAddress = () => {
    return (
      <>
        <h2 className="title title-simple text-left pt-10 mb-2">
          Billing Address
        </h2>
        <div className="address-info pb-8 mb-6">
          <p className="address-detail pb-2">
            {invoice.diff_name ? invoice.diff_name : invoice.customer_name}

            <br />
            {invoice.diff_email ? invoice.diff_email : invoice.customer_email}
            <br />
            {invoice.diff_phone ? invoice.diff_phone : invoice.customer_phone}
            <br />
            {invoice.diff_address
              ? invoice.diff_address
              : invoice.customer_address}
          </p>
          <p className="email">{invoice.note ? invoice.note : ""}</p>
        </div>
      </>
    );
  };
  return (
    <React.Fragment>
      <Head>
        <title>Order Tracking | The Owlet</title>
      </Head>
      <ToastContainer />
      <main className="main order">
        <div className="page-content pt-7 pb-10 mb-10">
          <div className="container mt-3">
            <div className="container">
              <h2 className="title title-center">Track Your Order</h2>
              <form
                className="input-wrapper input-wrapper-round input-wrapper-inline ml-lg-auto"
                style={{ margin: "0 auto" }}
                onSubmit={orderHandler}
              >
                <input
                  type="text"
                  className="form-control font-primary form-solid"
                  name="orderNumber"
                  placeholder="Enter Invoice Number"
                  onChange={orderInputHandler}
                  value={order.orderNumber}
                  onKeyUp={() =>
                    orderError.orderNumberError &&
                    setOrderError({ ...orderError, orderNumberError: "" })
                  }
                  required=""
                  style={{ border: "2px solid gainsboro", borderRight: "none" }}
                />

                {!buttonStatus ? (
                  <button
                    style={{
                      color: "#fff",
                      borderColor: "#f27955",
                      borderBottom: "none",
                      borderRight: "none",
                      backgroundColor: "#f27955",
                      borderRadius: "0 2.4rem 2.4rem 0",
                      fontWeight: "bold",
                      padding: "0 15px",
                      fontSize: "18px",
                    }}
                    type="submit"
                  >
                    Submit
                  </button>
                ) : (
                  <button className="btn btn-disabled">Finding...</button>
                )}
              </form>
              <div
                style={{
                  display: orderError.orderNumberError ? "block" : "none",

                  color: " #cb2431",
                }}
                className="title title-center mt-2"
              >
                {orderError.orderNumberError ? orderError.orderNumberError : ""}
              </div>
            </div>

            {invoice && orderResult()}

            {invoice && orderDetails()}
            {invoice && billingAddress()}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default index;
