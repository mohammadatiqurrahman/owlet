import React from "react";
import { useUserContext } from "../../context/user_context";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginForCheckout = ({ handleLoginForm, loginForm }) => {
  const {
    loginInfoError,
    setLoginInfoError,
    loginInputHandler,
    loginHandleSubmit,
    loginInfo,
    loginButtonLoading,
  } = useUserContext();

  const loginInputShowOrHide = () => {
    return (
      <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
        <i className="fas fa-exclamation-circle"></i>
        <span className="text-body">Returning customers?</span>{" "}
        <a
          className="text-primary collapse"
          onClick={handleLoginForm}
          style={{ cursor: "pointer", color: "#3c6fb8" }}
        >
          Click here to login
        </a>
      </div>
    );
  };

  const emailInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label htmlFor="singin_email">Email *</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Email Address *"
          onChange={loginInputHandler}
          value={loginInfo.email}
          onKeyUp={() =>
            loginInfoError.emailError &&
            setLoginInfoError({
              ...loginInfoError,
              emailError: "",
            })
          }
        />
        <div
          style={{
            display: loginInfoError.emailError ? "block" : "none",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {loginInfoError.emailError ? loginInfoError.emailError : ""}
        </div>
      </div>
    );
  };

  const passwordInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password *"
          onChange={loginInputHandler}
          value={loginInfo.password}
          onKeyUp={() =>
            loginInfoError.passwordError &&
            setLoginInfoError({
              ...loginInfoError,
              passwordError: "",
            })
          }
        />
        <div
          style={{
            display: loginInfoError.passwordError ? "block" : "none",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {loginInfoError.passwordError ? loginInfoError.passwordError : ""}
        </div>
      </div>
    );
  };

  const lostPassword = () => {
    return (
      <div className="checkbox d-flex align-items-center justify-content-between">
        <Link href="/forget_password">
          <a className="lost-link">Lost your password?</a>
        </Link>
      </div>
    );
  };

  const loginSubmitButton = () => {
    return (
      <div className="link-group">
        {!loginButtonLoading ? (
          <button type="submit" className="btn btn-dark btn-rounded mb-4">
            Login
          </button>
        ) : (
          <button className="btn btn-disabled btn-rounded mb-4">
            Processing
          </button>
        )}
      </div>
    );
  };
  
  return (
    <div className="card accordion">
      <ToastContainer />
      {loginInputShowOrHide()}
      <div
        className="alert-body"
        id="alert-body1"
        style={{
          display: `${loginForm ? "block" : "none"}`,
          border: "1px solid gray",
          padding: "15px",
          marginBottom: "25px",
        }}
      >
        <form onSubmit={loginHandleSubmit}>
          <div className="row cols-md-2">
            {emailInputField()}
            {passwordInputField()}
          </div>
          {lostPassword()}
          {loginSubmitButton()}
        </form>
      </div>
    </div>
  );
};

export default LoginForCheckout;
