import React, { useEffect } from "react";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../../context/cart_context";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
const index = () => {
  const { placeOrderClick, clearCart } = useCartContext();
  const router = useRouter();
  useEffect(() => {
    if (placeOrderClick) {
      toast.success(`${placeOrderClick.message}`);
      clearCart();
    } else {
      router.push("/");
    }
  }, []);
  if (!placeOrderClick) {
    return <Loading />;
  }
  // Order Result
  const orderResult = () => {
    return (
      <div className="order-results">
        <div className="overview-item">
          <span>Order number:</span>
          <strong>{placeOrderClick && placeOrderClick.order.reference}</strong>
        </div>
        <div className="overview-item">
          <span>Status:</span>
          <strong>
            {placeOrderClick &&
              placeOrderClick.order.status.charAt(0).toUpperCase() +
                placeOrderClick.order.status.slice(1)}
          </strong>
        </div>
        <div className="overview-item">
          <span>Date:</span>
          <strong>{placeOrderClick && placeOrderClick.order.date}</strong>
        </div>
        {/* <div className="overview-item">
          <span>Email:</span>
          <strong>{placeOrderClick && placeOrderClick.order.email}</strong>
        </div> */}
        <div className="overview-item">
          <span>Total:</span>
          <strong>
            BDT {placeOrderClick && placeOrderClick.order.total}.00
          </strong>
        </div>
        <div className="overview-item">
          <span>Payment method:</span>
          <strong>
            {placeOrderClick &&
            placeOrderClick.order.payment_method === "cash_on_delivery"
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
              {placeOrderClick &&
                JSON.parse(placeOrderClick.order.products).map(
                  (item, index) => {
                    return (
                      <tr key={index}>
                        <td className="product-name mr-2">
                          {item.name} - {item.color} - {item.size} x{" "}
                          {item.quantity}
                          {/* <span>
                            <i className="fas fa-times mr-2"></i>{" "}
                            {item.quantity}
                          </span> */}
                        </td>
                        <td className="product-price">
                          BDT {item.price * item.quantity}.00
                        </td>
                      </tr>
                    );
                  }
                )}

              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Shipping Cost:</h4>
                </td>
                <td className="summary-subtotal-price">
                  {placeOrderClick && placeOrderClick.order.shipping}
                </td>
              </tr>
              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Tax:</h4>
                </td>
                <td className="summary-subtotal-price">
                  {placeOrderClick && placeOrderClick.order.tax}.00
                </td>
              </tr>
              <tr className="summary-subtotal">
                <td>
                  <h4 className="summary-subtitle">Total:</h4>
                </td>
                <td>
                  <p className="summary-total-price">
                    BDT {placeOrderClick && placeOrderClick.order.total}.00
                  </p>
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
            {placeOrderClick && placeOrderClick.order.name}

            <br />
            {placeOrderClick && placeOrderClick.order.address}
            <br />
            {placeOrderClick && placeOrderClick.order.phone}
          </p>
          <p className="email">
            {placeOrderClick && placeOrderClick.order.email}
          </p>
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
          <div className="container mt-8">
            <div
              className="order-message mr-auto ml-auto"
              style={{ maxWidth: "45rem" }}
            >
              <div className="icon-box-content text-center">
                <h5 className="icon-box-title font-weight-bold lh-1 mb-1">
                  Thank You!
                </h5>
                <p className="lh-1 ls-m mt-2">
                  Your order will be delivered within 3-5 working days.
                </p>
              </div>
            </div>

            {orderResult()}

            {orderDetails()}
            {billingAddress()}

            <Link href="/">
              <a className="btn btn-icon-left btn-dark btn-back btn-rounded btn-md mb-4">
                <i className="d-icon-arrow-left"></i> Back to Home
              </a>
            </Link>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default index;
