import React from "react";
import Head from "next/head";
import AboutUsService from "../../services/AboutUsService";

// Banner and headline
const bannerAndHeadline = () => {
  return (
    <div
      className="page-header pl-4 pr-4"
      style={{ background: "white", height: "100px" }}
    >
      <h1
        className="page-title font-weight-bold lh-1 text-capitalize mt-5"
        style={{ color: "black" }}
      >
        Payment Methods
      </h1>
    </div>
  );
};

// Details section
const aboutDetails = (details) => {
  return (
    <div className="page-content">
      <div className="container mt-5 pb-5">
        <h5>WHAT PAYMENT OPTIONS CAN I USE ON THE OWLET ORDERS?</h5>
        <p>
          We want to make buying your favourite The Owlet products online fast
          and easy, and we accept the following payment options:
        </p>
        <ul>
          <li>Visa, Mastercard</li>
          <li>bKash</li>
          <li>Nagad</li>
          <li>Cash on Delivery</li>
        </ul>
        <p>
          The Owlet Members can store multiple debit or credit cards in their
          profile for faster checkout. If you're not already a Member, join us
          today.
        </p>
        <h3>FAQs</h3>
        <h5>Does my card need international purchases enabled?</h5>
        <p>
          Yes, we recommend asking your bank to enable international purchases
          on your card. You will be notified at checkout if international
          purchases need to be enabled.
        </p>
        <p>
          Please note, some banks may charge a small transaction fee for
          international orders.
        </p>
        <h5>Can I pay for my order with multiple methods?</h5>
        <p>
          No, payment for The Owlet.com orders can't be split between multiple
          payment methods.
        </p>
      </div>
    </div>
  );
};

const Aboutus = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Payment Methods | The Owlet</title>
      </Head>
      <main className="main mb-5">
        {bannerAndHeadline()}
        {aboutDetails()}
      </main>
    </React.Fragment>
  );
};

export default Aboutus;
