import { based_url } from "../../utils/constants";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUserContext } from "../../context/user_context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const {
    loginInfoError,
    setLoginInfoError,
    loginInputHandler,
    loginHandleSubmit,
    loginInfo,
    loginButtonLoading,
  } = useUserContext();
  return (
    <form onSubmit={loginHandleSubmit}>
      <div className="form-group mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email Address *"
          onChange={loginInputHandler}
          value={loginInfo.email}
          onKeyUp={() =>
            loginInfoError.emailError &&
            setLoginInfoError({ ...loginInfoError, emailError: "" })
          }
        />
        <div
          style={{
            display: loginInfoError.emailError ? "block" : "none",
            fontSize: "60%",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {loginInfoError.emailError ? loginInfoError.emailError : ""}
        </div>
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password *"
          onChange={loginInputHandler}
          value={loginInfo.password}
          onKeyUp={() =>
            loginInfoError.passwordError &&
            setLoginInfoError({ ...loginInfoError, passwordError: "" })
          }
        />
        <div
          style={{
            display: loginInfoError.passwordError ? "block" : "none",
            fontSize: "60%",
            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {loginInfoError.passwordError ? loginInfoError.passwordError : ""}
        </div>
      </div>
      <div className="form-footer">
        {/* <div className="form-checkbox">
          <input
            type="checkbox"
            className="custom-checkbox"
            id="signin-remember"
            name="signin-remember"
          />
          <label className="form-control-label" htmlFor="signin-remember">
            Remember me
          </label>
        </div> */}
        <Link href="/forget_password" className="lost-link">
          Lost your password?
        </Link>
      </div>
      {!loginButtonLoading ? (
        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Login
        </button>
      ) : (
        <button className="btn btn-disabled btn-block btn-rounded">
          Processing...
        </button>
      )}

      <ToastContainer />
    </form>
  );
};

export default Login;
