import React, { useState, useEffect } from "react";

import Login from "./Login";
import Signup from "./Signup";

const LoginSign = ({ locations }) => {
  const [loginActive, setLoginActive] = useState(true);
  const [signUpActive, setSignUpActive] = useState(false);

  const loginAndRegisterButton = () => {
    return (
      <ul
        className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5"
        role="tablist"
      >
        <li className="nav-item">
          <a
            className={`nav-link ${
              loginActive ? "active" : ""
            } border-no lh-1 ls-normal`}
            onClick={() => {
              setLoginActive(true);
              setSignUpActive(false);
            }}
          >
            Login
          </a>
        </li>
        <li className="delimiter">or</li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              signUpActive ? "active" : ""
            } border-no lh-1 ls-normal`}
            onClick={() => {
              setLoginActive(false);
              setSignUpActive(true);
            }}
          >
            Register
          </a>
        </li>
      </ul>
    );
  };

  const showLoginRegistrationSection = () => {
    return (
      <div className="tab-content">
        <div className={`tab-pane ${loginActive ? "active" : ""}`} id="signin">
          <Login />
        </div>
        <div
          className={`tab-pane ${signUpActive ? "active" : ""}`}
          id="register"
        >
          <Signup locations={locations} />
        </div>
      </div>
    );
  };
  return (
    <div className="login-popup" style={{ maxWidth: "650px" }}>
      <div className="form-box">
        <div className="tab tab-nav-simple tab-nav-boxed form-tab">
          {loginAndRegisterButton()}
          {showLoginRegistrationSection()}
        </div>
      </div>
    </div>
  );
};

export default LoginSign;
