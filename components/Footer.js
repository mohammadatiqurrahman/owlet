import React from "react";
import Link from "next/link";
const Footer = () => {
  const footerRightSide = () => {
    return (
      <div className="col-lg-4 col-md-4">
        <div className="widget widget-about">
          <a href="demo24.html" className="logo-footer">
            <img
              src="/images/demos/demo24/owlet.svg"
              alt="logo-footer"
              width="154"
              height="43"
            />
          </a>
          <div className="widget-contact-info widget-collapsible">
            <ul className="contact-info">
              <li className="info phone">
                <label>PHONE:</label>
                <a href="tel:#" target="_blank">
                  Toll Free (123) 456-7890
                </a>
              </li>
              <li className="info email">
                <label>EMAIL:</label>
                <a href="mailto:riode@mail.com" target="_blank">
                  riode@mail.com
                </a>
              </li>
              <li className="info addr">
                <label>ADDRESS:</label>
                <a href="#">123 Street, City, Country</a>
              </li>
              <li className="info work">
                <label>WORKING DAYS / HOURS:</label>
                <a href="#">Mon - Sun / 9:00 AM - 8:00 PM</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const footerMiddleSide = () => {
    return (
      <div className="col-lg-4 col-md-4">
        <div className="widget widget-info">
          <h4 className="widget-title">About Us</h4>
          <ul className="widget-body">
            <li>
              <Link href="/aboutus">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>

            <li>
              <Link href="/return_policy">Return Policy</Link>
            </li>
            <li>
              <Link href="/shipping_policy">Shipping Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const footerLeftSide = () => {
    return (
      <div className="col-lg-4 col-md-4">
        <div className="widget widget-service">
          <h4 className="widget-title">Customer Service</h4>
          <ul className="widget-body">
            <li>
              <a href="#">Payment Methods</a>
            </li>
            <li>
              <a href="#">Money-back Guarantee!</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Customer Service</a>
            </li>
            <li>
              <a href="#">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const footerBottom = () => {
    return (
      <div className="footer-bottom">
        <div className="footer-left">
          <figure className="payment">
            <img
              src="/images/payment.png"
              alt="payment"
              width="159"
              height="29"
            />
          </figure>
        </div>
        <div className="footer-center">
          <p className="copyright">
            Riode eCommerce &copy; 2021. All Rights Reserved
          </p>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a
              href="#"
              className="social-link social-facebook fab fa-facebook-f"
            ></a>

            <a
              href="#"
              className="social-link social-linkedin fab fa-linkedin-in"
            ></a>
          </div>
        </div>
      </div>
    );
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-middle">
          <div className="row">
            {footerRightSide()}
            {footerMiddleSide()}
            {footerLeftSide()}
          </div>
        </div>

        {footerBottom()}
      </div>
    </footer>
  );
};

export default Footer;
