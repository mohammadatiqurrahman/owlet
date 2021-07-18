import React from "react";
import { useGeneralContext } from "../../context/general_context";

const UserProfileEditModal = () => {
  const [ setUserProfileEditModal] = useGeneralContext();
  return (
    <React.Fragment>
      <ToastContainer />
      <div
        className="mfp-bg mfp-newsletter mfp-flip-popup mfp-ready"
        style={{ display: "block" }}
      ></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-newsletter mfp-flip-popup mfp-ready"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="mfp-container mfp-s-ready mfp-inline-holder">
          <div className="mfp-content">
            <div className="newsletter-popup" id="newsletter-popup">
              <div className="container">
                <div className="row">
                  <h4 className="text-uppercase text-dark mt-5">
                    Change Password
                  </h4>

                  
                </div>
              </div>

              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => setUserProfileEditModal(false)}
              >
                <span>×</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfileEditModal;
