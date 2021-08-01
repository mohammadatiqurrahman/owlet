import React, { useState } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
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

  const [invoice, setInvoice] = useState([]);
  // console.log(invoice.length > 0 && JSON.parse(invoice[0].products));
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
      setOrderError({
        ...orderError,
        orderNumberError: order.orderNumber
          ? ""
          : "The order tracking field is required.",
      });
      return;
    }

    const orderResponse = await OrderTrackingService.instance.getOrderStatus(
      order
    );
    // console.log(orderResponse);
    setButtonStatus(false);
    setInvoice(orderResponse);
    if (orderResponse.length == 0) {
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
          <strong>{invoice[0].reference}</strong>
        </div>
        <div className="overview-item">
          <span>Status:</span>
          <strong>
            {invoice[0].status.charAt(0).toUpperCase() +
              invoice[0].status.slice(1)}
          </strong>
        </div>
        <div className="overview-item">
          <span>Date:</span>
          <strong>{invoice[0].date}</strong>
        </div>
        {/* <div className="overview-item">
          <span>Email:</span>
          <strong>{invoice[0].email}</strong>
        </div> */}
        <div className="overview-item">
          <span>Total:</span>
          <strong>BDT {invoice[0].total}</strong>
        </div>
        <div className="overview-item">
          <span>Payment method:</span>
          <strong>
            {invoice[0].payment_method === "cash_on_delivery"
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
              {JSON.parse(invoice[0].products).map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="product-name mr-2">
                      {item.name} - {item.color} - {item.size} x {item.quantity}
                      {/* <span>
                            <i className="fas fa-times mr-2"></i>{" "}
                            {item.quantity}
                          </span> */}
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
                  {invoice[0].shipping_cost}
                </td>
              </tr>
              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Tax:</h4>
                </td>
                <td className="summary-subtotal-price">{invoice[0].tax}</td>
              </tr>
              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Total:</h4>
                </td>
                <td>
                  <p className="summary-total-price">BDT {invoice[0].total}</p>
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
            {invoice && invoice.order.name}

            <br />
            {invoice && invoice.order.address}
            <br />
            {invoice && invoice.order.phone}
          </p>
          <p className="email">{invoice && invoice.order.email}</p>
        </div>
      </>
    );
  };
  return (
    <React.Fragment>
      <Head>
        <title>Order Confirmation | The Owlet</title>
      </Head>
      <ToastContainer />
      <main className="main order">
        <div className="page-content pt-7 pb-10 mb-10">
          <div className="container mt-3">
            <div className="container">
              <h2 className="title title-center">Track your order</h2>
              <form
                className="input-wrapper input-wrapper-round input-wrapper-inline ml-lg-auto"
                style={{ margin: "0 auto" }}
                onSubmit={orderHandler}
              >
                <input
                  type="text"
                  className="form-control font-primary font-italic form-solid"
                  name="orderNumber"
                  placeholder="Order Number"
                  onChange={orderInputHandler}
                  value={order.orderNumber}
                  onKeyUp={() =>
                    orderError.orderNumberError &&
                    setOrderError({ ...orderError, orderNumberError: "" })
                  }
                  required=""
                  style={{ border: "2px solid gainsboro" }}
                />

                {!buttonStatus ? (
                  <button className="btn btn-dark" type="submit">
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
                  margin: "0 auto",
                }}
              >
                {orderError.orderNumberError ? orderError.orderNumberError : ""}
              </div>
            </div>

            {invoice.length > 0 && orderResult()}

            {invoice.length > 0 && orderDetails()}
            {/* {billingAddress()} */}
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default index;
