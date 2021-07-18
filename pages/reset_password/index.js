import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { based_url } from "../../utils/constants";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPasswordService from "../../services/ResetPasswordService";

const index = () => {
  const router = useRouter();
  const token = router.query.token;
  const [resetPasswordStatus, setResetPasswordStatus] = useState(false);

  // Input store and form error start
  const [resetPassword, setResetPassword] = useState({
    password: "",
    password_confirmation: "",
    token: "",
  });
  const [resetPassError, setResetPassError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });

  const resetInputHandler = async (e) => {
    const { name, value } = e.target;
    setResetPassword({ ...resetPassword, [name]: value });
  };
  // Input store and form error start

  // Submit form
  const resetHandleSubmit = async (e) => {
    e.preventDefault();
    if (!resetPassword.password || !resetPassword.password_confirmation) {
      setResetPassError({
        ...resetPassError,
        passwordError: resetPassword.password
          ? ""
          : "The password field is required",
        confirmPasswordError: resetPassword.password_confirmation
          ? ""
          : "The confirm password field is required",
      });
      return;
    }

    setResetPasswordStatus(true);
    if (resetPassword.password !== resetPassword.password_confirmation) {
      setResetPasswordStatus(false);
      setResetPassError({
        ...resetPassError,
        passwordError: "The password confirmation does not match.",
        confirmPasswordError:
          "The password confirmation and password must match.",
      });
      return;
    }

    const updateResponse = await ResetPasswordService.instance.updatePassword(
      resetPassword
    );

    setResetPasswordStatus(false);
    toast.success(updateResponse.message);
  };

  useEffect(() => {
    setResetPassword({ ...resetPassword, token });
  }, [token]);

  return (
    <React.Fragment>
      <ToastContainer />
      <Head>
        <title>Reset Password | The Owlet</title>
      </Head>
      <main className="main">
        <div className="page-content mt-6 pb-2 mb-10">
          <div className="container">
            <div className="login-popup">
              <div className="form-box">
                <div className="tab tab-nav-simple tab-nav-boxed form-tab">
                  <div className="tab-content">
                    <div className="tab-pane active">
                      <form onSubmit={resetHandleSubmit}>
                        <div className="form-group mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password *"
                            onChange={resetInputHandler}
                            value={resetPassword.password}
                            onKeyUp={() =>
                              resetPassError.passwordError &&
                              setResetPassError({
                                ...resetPassError,
                                passwordError: "",
                              })
                            }
                          />
                          <div
                            style={{
                              display: resetPassError.passwordError
                                ? "block"
                                : "none",
                              fontSize: "60%",
                              color: " #cb2431",
                              marginLeft: "5px",
                            }}
                          >
                            {resetPassError.passwordError
                              ? resetPassError.passwordError
                              : ""}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control"
                            name="password_confirmation"
                            id="password_confirmation"
                            placeholder="Confirm Password *"
                            onChange={resetInputHandler}
                            value={resetPassword.password_confirmation}
                            onKeyUp={() =>
                              resetPassError.confirmPasswordError &&
                              setResetPassError({
                                ...resetPassError,
                                confirmPasswordError: "",
                              })
                            }
                          />
                          <div
                            style={{
                              display: resetPassError.confirmPasswordError
                                ? "block"
                                : "none",
                              fontSize: "60%",
                              color: " #cb2431",
                              marginLeft: "5px",
                            }}
                          >
                            {resetPassError.confirmPasswordError
                              ? resetPassError.confirmPasswordError
                              : ""}
                          </div>
                        </div>
                        {!resetPasswordStatus ? (
                          <button
                            className="btn btn-dark btn-block btn-rounded"
                            type="submit"
                          >
                            Reset Password
                          </button>
                        ) : (
                          <button className="btn btn-disabled btn-block btn-rounded">
                            Changing Password...
                          </button>
                        )}
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
