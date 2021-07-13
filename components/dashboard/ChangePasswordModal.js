import React from "react";

const ChangePasswordModal = () => {
  return (
    <React.Fragment>
      <div
        className="mfp-bg mfp-newsletter mfp-flip-popup mfp-ready"
        style={{ display: "block" }}
      ></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-newsletter mfp-flip-popup mfp-ready"
        tabindex="-1"
        style={{ display: "block" }}
      >
        <div className="mfp-container mfp-s-ready mfp-inline-holder">
          <div className="mfp-content">
            <div className="newsletter-popup" id="newsletter-popup">
              <div className="newsletter-content">
                <h4 className="text-uppercase text-dark">
                  Up to <span className="text-primary">20% Off</span>
                </h4>
                <h2 className="font-weight-semi-bold">
                  Sign up to <span>RIODE</span>
                </h2>
                <p className="text-grey">
                  Subscribe to the Riode eCommerce newsletter to receive timely
                  updates from your favorite products.
                </p>

                <div className="form-checkbox justify-content-center">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    id="hide-newsletter-popup"
                    name="hide-newsletter-popup"
                    required=""
                  />
                  <label for="hide-newsletter-popup">
                    Don't show this popup again
                  </label>
                </div>
              </div>
              <button title="Close (Esc)" type="button" className="mfp-close">
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="mfp-preloader"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePasswordModal;
