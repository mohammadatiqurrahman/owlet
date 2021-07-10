import React from "react";
import { useUserContext } from "../../context/user_context";

const DashboardStatus = () => {
  const { order } = useUserContext();

  // console.log(order);
  const confirmed = order.filter((item) => item.status === "confirmed");
  const processing = order.filter((item) => item.status === "processing");
  const cancelled = order.filter((item) => item.status === "cancelled");
  const shipped = order.filter((item) => item.status === "shipped");
  const delivered = order.filter((item) => item.status === "delivered");
  // console.log(confirmed.length);
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-3 col-6 mr-2 ml-2"
          style={{ background: "#6c757d", borderRadius: "5px" }}
        >
          <div className="small-box bg-info">
            <div className="inner">
              <h3 id="total_orders" style={{ color: "white" }}>
                {confirmed && confirmed.length}
              </h3>
              <p id="total_order_text" style={{ color: "White" }}>
                Confirmed Orders
              </p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
            </div>
          </div>
        </div>
        <div
          className="col-md-3 col-6 mr-2 ml-2"
          style={{ background: "#dc3545", borderRadius: "5px" }}
        >
          <div className="small-box bg-info">
            <div className="inner">
              <h3 id="total_orders" style={{ color: "white" }}>
                {cancelled && cancelled.length}
              </h3>
              <p id="total_order_text" style={{ color: "White" }}>
                Cancelled Orders
              </p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
            </div>
          </div>
        </div>
        <div
          className="col-md-3 col-6 mr-2 ml-2"
          style={{ background: "#007bff", borderRadius: "5px" }}
        >
          <div className="small-box bg-info">
            <div className="inner">
              <h3 id="total_orders" style={{ color: "white" }}>
                {processing && processing.length}
              </h3>
              <p id="total_order_text" style={{ color: "White" }}>
                Processing Orders
              </p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div
          className="col-md-3 col-6 mr-2 ml-2"
          style={{ background: "#17a2b8", borderRadius: "5px" }}
        >
          <div className="small-box bg-info">
            <div className="inner">
              <h3 id="total_orders" style={{ color: "white" }}>
                {shipped && shipped.length}
              </h3>
              <p id="total_order_text" style={{ color: "White" }}>
                Shipped Orders
              </p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
            </div>
          </div>
        </div>
        <div
          className="col-md-3 col-6 mr-2 ml-2"
          style={{ background: "#28a745", borderRadius: "5px" }}
        >
          <div className="small-box bg-info">
            <div className="inner">
              <h3 id="total_orders" style={{ color: "white" }}>
                {delivered && delivered.length}
              </h3>
              <p id="total_order_text" style={{ color: "White" }}>
                Delivered Orders
              </p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatus;
