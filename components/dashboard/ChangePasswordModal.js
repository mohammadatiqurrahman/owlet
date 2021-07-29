import React, { useState } from "react";
import { useGeneralContext } from "../../context/general_context";
import { useUserContext } from "../../context/user_context";
import DashboardService from "../../services/DashboardService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
const ChangePasswordModal = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const [changePasswordStatus, setChangePasswordStatus] = useState(false);
  const { setChangePasswordModal } = useGeneralContext();
  const [changePassword, setChangePassword] = useState({
    password: "",
    password_confirmation: "",
  });

  const [changePassError, setChangePassError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });
  const changePasswordInputHandler = (e) => {
    const { name, value } = e.target;
    setChangePassword({ ...changePassword, [name]: value });
  };
  const changePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!changePassword.password || !changePassword.password_confirmation) {
      setChangePassError({
        ...changePassError,
        passwordError: changePassword.password
          ? ""
          : "The password field is required",
        confirmPasswordError: changePassword.password_confirmation
          ? ""
          : "The confirm password field is required",
      });
      return;
    }
    setChangePasswordStatus(true);
    if (changePassword.password !== changePassword.password_confirmation) {
      setChangePasswordStatus(false);
      setChangePassError({
        ...changePassError,
        passwordError: "The password confirmation does not match.",
        confirmPasswordError:
          "The password confirmation and password must match.",
      });
      return;
    }
    const updateResponse =
      await DashboardService.instance.editPasswordFromDashboard(
        user.customer.token,
        changePassword
      );

    if (updateResponse.message) {
      localStorage.removeItem("user");
      setChangePasswordModal(false);
      router.push("/login");
      return;
    }
    setChangePasswordStatus(false);
    toast.success(updateResponse.message);
  };

  const passwordInputField = () => {
    return (
      <>
        <div style={{ textAlign: "left", color: "black" }}>Password</div>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          style={{ border: "1px solid #232323" }}
          onChange={changePasswordInputHandler}
          value={changePassword.password}
          onKeyUp={() =>
            changePassError.passwordError &&
            setChangePassError({
              ...changePassError,
              passwordError: "",
            })
          }
        />
        <div
          style={{
            display: changePassError.passwordError ? "block" : "none",
            fontSize: "80%",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {changePassError.passwordError ? changePassError.passwordError : ""}
        </div>
      </>
    );
  };

  const confirmPasswordInputField = () => {
    return (
      <>
        <div style={{ textAlign: "left", color: "black" }} className="mt-3">
          Confirm Password
        </div>
        <input
          type="password"
          className="form-control"
          name="password_confirmation"
          placeholder="Confirm Password"
          style={{ border: "1px solid #232323" }}
          onChange={changePasswordInputHandler}
          value={changePassword.password_confirmation}
          onKeyUp={() =>
            changePassError.confirmPasswordError &&
            setChangePassError({
              ...changePassError,
              confirmPasswordError: "",
            })
          }
        />
        <div
          style={{
            display: changePassError.confirmPasswordError ? "block" : "none",
            fontSize: "80%",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {changePassError.confirmPasswordError
            ? changePassError.confirmPasswordError
            : ""}
        </div>
      </>
    );
  };
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

                  <form
                    style={{
                      padding: "0px 95px 15px 95px",
                    }}
                    onSubmit={changePasswordSubmit}
                  >
                    {passwordInputField()}
                    {confirmPasswordInputField()}
                    {!changePasswordStatus ? (
                      <button className="btn btn-dark mt-3" type="submit">
                        Change Password
                      </button>
                    ) : (
                      <button className="btn btn-disabled mt-3">
                        Changing password...
                      </button>
                    )}
                  </form>
                </div>
              </div>

              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => setChangePasswordModal(false)}
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

export default ChangePasswordModal;
