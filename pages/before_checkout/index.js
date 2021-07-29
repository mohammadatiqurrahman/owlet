import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useUserContext } from "../../context/user_context";
import Signup from "../../components/login/Signup";
import BeforeCheckoutService from "../../services/BeforeCheckoutService";

const index = ({ locations }) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    loginInfoError,
    setLoginInfoError,
    loginInputHandler,
    loginHandleSubmit,
    loginInfo,
    loginButtonLoading,
  } = useUserContext();

  // Head and title
  const headAndTitle = () => {
    return (
      <Head>
        <title>Before Checkout | The Owlet</title>
      </Head>
    );
  };

  // Returning Customer
  const returningCustomer = () => {
    return (
      <div
        style={{
          borderRadius: "15px",
          backgroundColor: "rgb(249 248 246)",
          padding: "30px",
          borderBottom: "2px solid #d0cfcc",
        }}
      >
        <h3>Returning Customer</h3>
        <p>Speed up the checkout process.</p>

        <div className="login-popup p-0">
          <div className="form-box">
            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
              <ul
                className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5"
                role="tablist"
              ></ul>
              <div
                className="tab-content"
                style={{ backgroundColor: "rgb(249 248 246)" }}
              >
                <div className="tab-pane active" id="signin">
                  <form onSubmit={loginHandleSubmit}>
                    <div className="form-group mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email Address *"
                        style={{ backgroundColor: "white" }}
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
                          fontSize: "60%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {loginInfoError.emailError
                          ? loginInfoError.emailError
                          : ""}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password *"
                        style={{ backgroundColor: "white" }}
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
                          display: loginInfoError.passwordError
                            ? "block"
                            : "none",
                          fontSize: "60%",
                          color: " #cb2431",
                          marginLeft: "5px",
                        }}
                      >
                        {loginInfoError.passwordError
                          ? loginInfoError.passwordError
                          : ""}
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
                        <label
                          className="form-control-label"
                          htmlFor="signin-remember"
                        >
                          Remember me
                        </label>
                      </div> */}
                      <Link href="/forget_password">
                        <a className="lost-link">Lost your password?</a>
                      </Link>
                    </div>
                    <p>
                      By signing in, you are agreeing to our{" "}
                      <a href="#" style={{ color: "#3c6fb8" }}>
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="#" style={{ color: "#3c6fb8" }}>
                        Privacy Policy
                      </a>
                      .
                    </p>
                    {!loginButtonLoading ? (
                      <button
                        className="btn btn-dark btn-block btn-rounded"
                        type="submit"
                      >
                        Sign In
                      </button>
                    ) : (
                      <button className="btn btn-disabled  btn-block btn-rounded">
                        Processing...
                      </button>
                    )}

                    <ToastContainer />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Guest Checkout - continue checkout without loging/register
  const guestCheckout = () => {
    return (
      <div
        className="mb-2"
        style={{
          borderRadius: "15px",
          backgroundColor: "rgb(249 248 246)",
          padding: "30px",
          borderBottom: "2px solid #d0cfcc",
        }}
      >
        <h3>Guest Checkout</h3>
        <p>It's OK, owl still love you.</p>
        <Link href="/guest_checkout">
          <span className="btn btn-dark btn-block btn-rounded" type="submit">
            Checkout
          </span>
        </Link>
      </div>
    );
  };

  // Register before checkout
  const newCustomer = () => {
    return (
      <>
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
              // height: 30vh;
              max-width: 820px;

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
        <div
          style={{
            borderRadius: "15px",
            backgroundColor: "rgb(249 248 246)",
            padding: "30px",
            borderBottom: "2px solid #d0cfcc",
          }}
          className="mb-2"
        >
          <h3>New Customers</h3>
          <p>Join The Owlet family!</p>
          <button
            className="btn btn-dark btn-block btn-rounded modal-btn"
            type="submit"
            onClick={() => setOpenModal(true)}
          >
            Sign Up
          </button>
          <div className={`modal-overlay ${openModal ? "open-modal" : ""}`}>
            <div className="modal-container">
              <div
                style={{
                  borderRadius: "15px",
                  backgroundColor: "rgb(249 248 246)",
                  padding: "30px",
                  borderBottom: "2px solid #d0cfcc",
                }}
              >
                <h3>Register</h3>
                <p>Register to speed up the checkout process.</p>

                <div className="login-popup p-0">
                  <div className="form-box">
                    <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                      <div
                        className="tab-content"
                        style={{ backgroundColor: "rgb(249 248 246)" }}
                      >
                        <div className="tab-pane active" id="signin">
                          <Signup locations={locations} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="close-btn" onClick={() => setOpenModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <React.Fragment>
      {headAndTitle()}
      <main className="main home">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <h2 className="text-center mt-5">Checkout</h2>
              <div className="col-md-6 mb-3">{returningCustomer()}</div>
              <div className="col-md-6">
                {newCustomer()}

                {guestCheckout()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const locations = await BeforeCheckoutService.instance.getLocationList();
  return {
    props: {
      locations,
    },
    // revalidate: 10,
  };
};
export default index;
