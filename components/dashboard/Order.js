import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/user_context";
import { based_url } from "../../utils/constants";
import { paginate } from "../../utils/helpers";
const Order = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  // console.log(products);
  const { order } = useUserContext();
  // console.log(order);
  const [tax, setTax] = useState(null);
  const [total, setTotal] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);
  const [page, setPage] = useState(0);
  const [paginatedOrder, setPaginatedOrder] = useState([]);
  // console.log(paginatedOrder);
  useEffect(() => {
    setPaginatedOrder(paginate(order));
  }, [order]);

  const prevPage = () => {
    page >= 1 && setPage(page - 1);
  };
  const nextPage = () => {
    page < paginatedOrder.length - 1 && setPage(page + 1);
  };
  const numericPage = (pageIndex) => {
    setPage(pageIndex);
  };
  const getOrderStatusColor = (status) => {
    let backgroundColor;
    if (status === "confirmed") {
      backgroundColor = "#6c757d";
    }
    if (status === "cancelled") {
      backgroundColor = "#dc3545";
    }
    if (status === "shipped") {
      backgroundColor = "#17a2b8";
    }
    if (status === "processing") {
      backgroundColor = "#007bff";
    }
    if (status === "delivered") {
      backgroundColor = "#28a745";
    }
    return (
      <span style={{ backgroundColor, color: "white", fontWeight: "bold" }}>
        {status}
      </span>
    );
  };
  return (
    <React.Fragment>
      {paginatedOrder.length > 0 ? (
        <React.Fragment>
          <table className="order-table">
            <thead>
              <tr>
                <th className="pl-2">Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th className="pr-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrder &&
                paginatedOrder[page].map((item, index) => {
                  const {
                    reference,
                    products,
                    total,
                    shipping_cost,
                    tax,
                    status,
                    date,
                  } = item;
                  return (
                    <tr key={index}>
                      <td className="order-date">
                        <time>{reference}</time>
                      </td>
                      <td className="order-date">
                        <time>{date}</time>
                      </td>
                      <td className="order-status">
                        {getOrderStatusColor(status)}
                      </td>
                      <td className="order-total">
                        <span>
                          BDT {Math.floor(total)}.00 for{" "}
                          {JSON.parse(products).length}{" "}
                          {JSON.parse(products).length > 1 ? "items" : "item"}
                        </span>
                      </td>
                      <td className="order-action">
                        <a
                          className="btn btn-primary btn-link btn-underline"
                          onClick={() => {
                            setOpenModal(true);
                            setProducts(JSON.parse(products));
                            setTax(tax);
                            setTotal(total);
                            setShippingCost(shipping_cost);
                          }}
                        >
                          View Detail
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <nav className="toolbox toolbox-pagination">
            <p className="show-info"></p>
            <ul className="pagination">
              <li
                className="page-item"
                onClick={prevPage}
                style={{ display: page === 0 ? "none" : "block" }}
              >
                <a
                  className="page-link page-link-prev"
                  aria-label="Previous"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  <i className="d-icon-arrow-left"></i>Prev
                </a>
              </li>

              {paginatedOrder.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`page-item ${page === index ? "active" : ""}`}
                    aria-current="page"
                    onClick={() => numericPage(index)}
                  >
                    <a className="page-link">{index + 1}</a>
                  </li>
                );
              })}

              {
                <li
                  className="page-item"
                  onClick={nextPage}
                  style={{
                    display:
                      page === paginatedOrder.length - 1 ? "none" : "block",
                  }}
                >
                  <a className="page-link page-link-next" aria-label="Next">
                    Next<i className="d-icon-arrow-right"></i>
                  </a>
                </li>
              }
            </ul>
          </nav>
        </React.Fragment>
      ) : (
        <h1>No Orders Yet</h1>
      )}
      <style jsx>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(73, 166, 233, 0.5);
            display: grid;
            place-items: center;
            transition: all 0.3s linear;
            visibility: hidden;
            z-index: -10;
            overflow: scroll;
          }
          /* OPEN/CLOSE MODAL */
          .open-modal {
            visibility: visible;
            z-index: 10;
          }
          .modal-container {
            background: rgb(249 248 246);
            border-radius: 0.5rem;
            width: 90vw;

            max-width: 920px;

            display: grid;
            place-items: center;
            position: relative;
          }
          .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 2rem;
            background: transparent;
            border-color: transparent;
            color: hsl(360, 67%, 44%);
            cursor: pointer;
            transition: all 0.3s linear;
          }
          .close-btn:hover {
            color: hsl(360, 71%, 66%);
            transform: scale(1.3);
          }
        `}
      </style>
      <div className={`modal-overlay ${openModal ? "open-modal" : ""}`}>
        <div className="modal-container" style={{ padding: "30px" }}>
          <h4>Order Details</h4>
          <table className="order-table">
            <thead>
              <tr>
                <th
                  className="text-center"
                  style={{ border: "1px solid gray" }}
                >
                  SL.
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid gray" }}
                >
                  Name
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid gray" }}
                >
                  Size
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid gray" }}
                >
                  Color
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid gray" }}
                >
                  Quantity
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid gray" }}
                >
                  Price
                </th>

                {/* <th>Tax</th> */}
                <th
                  className="text-center"
                  style={{ border: "1px solid gray" }}
                >
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((item, index) => {
                  const {
                    color,
                    discount,
                    name,
                    price,
                    quantity,
                    size,
                    subtotal,
                    tax,
                  } = item;
                  return (
                    <tr key={index} style={{ border: "1px solid gray" }}>
                      <td
                        className="order-date text-center"
                        style={{ border: "1px solid gray" }}
                      >
                        <time>{index + 1}</time>
                      </td>
                      <td
                        className="order-date text-center"
                        style={{ border: "1px solid gray" }}
                      >
                        <time>{name}</time>
                      </td>
                      <td
                        className="order-date text-center"
                        style={{ border: "1px solid gray" }}
                      >
                        <span>{size}</span>
                      </td>
                      <td
                        style={{ border: "1px solid gray" }}
                        className="order-date text-center"
                      >
                        <span>{color}</span>
                      </td>
                      <td
                        style={{ border: "1px solid gray" }}
                        className="order-date text-center"
                      >
                        <span>{quantity}</span>
                      </td>
                      <td
                        style={{ border: "1px solid gray" }}
                        className="order-date text-center"
                      >
                        <span>BDT {price}</span>
                      </td>

                      {/* <td className="order-date">
                        <span>{tax}</span>
                      </td> */}
                      <td className="order-date text-center">
                        <span>BDT {quantity * price}.00</span>
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td
                  colSpan="6"
                  className="font-weight-bold"
                  style={{ border: "1px solid gray" }}
                >
                  Tax
                </td>
                <td
                  className="font-weight-bold text-center"
                  style={{ border: "1px solid gray" }}
                >
                  BDT {Math.round(tax)}.00
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  className="font-weight-bold"
                  style={{ border: "1px solid gray" }}
                >
                  Shipping Cost
                </td>
                <td
                  className="font-weight-bold text-center"
                  style={{ border: "1px solid gray" }}
                >
                  BDT {Math.round(shippingCost)}.00
                </td>
              </tr>
              <tr>
                <td
                  colSpan="6"
                  className="font-weight-bold"
                  style={{ border: "1px solid gray" }}
                >
                  Total
                </td>
                <td
                  className="font-weight-bold text-center"
                  style={{ border: "1px solid gray" }}
                >
                  BDT {Math.round(total)}.00
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => setOpenModal(false)}
            className="btn mt-4"
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              fontWeight: "bold",
              marginLight: "100%",
            }}
          >
            Close
          </button>
          <button className="close-btn" onClick={() => setOpenModal(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Order;
