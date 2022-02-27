import React, { useEffect, useState } from "react";
import SyncLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import ForgetPasswordService from "../../services/ForgetPasswordService";

const index = () => {
  // Input error management
  const [forgetPasswordError, setForgetPasswordError] = useState({
    emailError: "",
    emailTouched: false,
    emailLoading: false,
    reset_link_send_fail: "",
  });

  // Store input value
  const [forgetPasswordInfo, setForgetPasswordInfo] = useState({
    email: "",
    reset_link_send_success: "",
  });
  const forgetPasswordInputHandler = async (e) => {
    const { name, value } = e.target;
    setForgetPasswordInfo({ ...forgetPasswordInfo, [name]: value });
  };

  const [forgetPasswordLoading, setForgetPasswordLoading] = useState(false);

  // Error Message Start
  const getErrorMessageEmail = async (emailValue) => {
    setForgetPasswordError({ ...forgetPasswordError, emailLoading: true });
    const emailError =
      await ForgetPasswordService.instance.checkForgetPasswordMail(emailValue);

    setForgetPasswordError({
      ...forgetPasswordError,
      emailError,
      emailTouched: true,
      emailLoading: false,
    });
  };

  // Init a timeout variable to be used below
  let timeout = null;
  const fetchErrorMessageEmail = (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (forgetPasswordInfo.email !== "") {
        getErrorMessageEmail(event.target.value);
      }
    }, 1000);
  };
  const onKeyDownEmail = () => {
    clearTimeout(timeout);
    setForgetPasswordError({ ...forgetPasswordError, emailError: "" });
  };
  // Error Message End

  // Submit forget password form
  const forgetPasswordHandleSubmit = async (e) => {
    e.preventDefault();
    setForgetPasswordLoading(true);

    const forgetPasswordResponse =
      await ForgetPasswordService.instance.forgetPassword(
        forgetPasswordInfo.email
      );

    if (forgetPasswordResponse.message) {
      setForgetPasswordLoading(false);
      toast.success(forgetPasswordResponse.message);
    } else {
      setForgetPasswordLoading(false);
      toast.error(forgetPasswordResponse.errors.email[0]);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Forget Password | The Owlet</title>
      </Head>
      <main className="main">
        <div className="page-content mt-6 pb-2 mb-10">
          <div className="container">
            <div className="login-popup">
              <div className="form-box">
                <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                  <div className="tab-content">
                    <div className="tab-pane active">
                      <form onSubmit={forgetPasswordHandleSubmit}>
                        <h5 className="text-center">Enter Reset Email</h5>
                        <div className="form-group mb-3">
                          <div
                            style={{
                              display: "flex",
                              position: "relative",
                              border: "1px solid gainsboro",
                            }}
                          >
                            <input
                              onKeyUp={(e) => {
                                fetchErrorMessageEmail(e);
                              }}
                              onKeyDown={onKeyDownEmail}
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              placeholder="Email Address *"
                              style={{
                                backgroundColor: "white",
                                border: "none",
                              }}
                              onChange={forgetPasswordInputHandler}
                              value={forgetPasswordInfo.email}
                            />
                            {forgetPasswordInfo.email !== "" ||
                            forgetPasswordError.emailError ? (
                              <>
                                {forgetPasswordError.emailLoading ? (
                                  <SyncLoader
                                    color="red"
                                    loading={true}
                                    css={{
                                      display: "block",
                                      margin: "0 auto",
                                      borderColor: "gray",
                                      alignSelf: "center",
                                      marginRight: "5px",
                                    }}
                                    size={15}
                                  />
                                ) : forgetPasswordError.emailError ? (
                                  forgetPasswordError.emailError.errors
                                    .email ? (
                                    <i
                                      className="fas fa-exclamation-triangle"
                                      style={{
                                        alignSelf: "center",
                                        paddingRight: "7px",
                                        fontSize: "80%",
                                        color: "#cb2431",
                                      }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="fas fa-check"
                                      style={{
                                        alignSelf: "center",
                                        paddingRight: "7px",
                                        fontSize: "90%",
                                        color: "#5ab034",
                                      }}
                                    ></i>
                                  )
                                ) : null}
                              </>
                            ) : null}
                          </div>
                          <div
                            style={{
                              display:
                                forgetPasswordInfo.email ||
                                forgetPasswordError.emailError
                                  ? "block"
                                  : "none",
                              fontSize: "80%",
                              color: " #cb2431",
                              marginLeft: "5px",
                            }}
                          >
                            {forgetPasswordError.emailError
                              ? forgetPasswordError.emailError.errors.email
                                ? forgetPasswordError.emailError.errors.email[0]
                                : ""
                              : ""}
                          </div>
                          <div
                            style={{
                              display:
                                !forgetPasswordInfo.email &&
                                forgetPasswordError.emailTouched
                                  ? "block"
                                  : "none",
                              fontSize: "60%",
                              color: " #cb2431",
                              marginLeft: "5px",
                            }}
                          >
                            This email field is required
                          </div>
                        </div>

                        {!forgetPasswordLoading ? (
                          <button
                            className="btn btn-dark btn-block btn-rounded"
                            type="submit"
                          >
                            Request New Password
                          </button>
                        ) : (
                          <button className="btn btn-disabled btn-block btn-rounded">
                            Sending mail ...
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
        </div>
      </main>
    </React.Fragment>
  );
};

export default index;
