import React from "react";

const Buttons = () => {
  return (
    <div className="step-by pr-4 pl-4">
      <h3 className="title title-simple title-step active">
        <a href="cart.html">1. Shopping Cart</a>
      </h3>
      <h3 className="title title-simple title-step">
        <a href="checkout.html">2. Checkout</a>
      </h3>
      <h3 className="title title-simple title-step">
        <a href="order.html">3. Order Complete</a>
      </h3>
    </div>
  );
};

export default Buttons;
