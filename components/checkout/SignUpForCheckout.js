import React, { useEffect, useState } from "react";
import SyncLoader from "react-spinners/ClipLoader";

import { useUserContext } from "../../context/user_context";
import CheckoutService from "../../services/CheckoutService";
const SignUpForCheckout = ({ locations, handleSignUpForm, signUpForm }) => {
  const {
    signUpError,
    setSignUpError,
    signUpInfo,
    signUpInputHandler,
    signUpHandleSubmit,
    fetchErrorMessageEmail,
    fetchErrorMessagePhone,
    onKeyDown,
    signupButtonLoading,
  } = useUserContext();
  const [areas, setAreas] = useState([]);

  const getAreas = async () => {
    if (signUpInfo.location) {
      const areas = await CheckoutService.instance.getLocationWiseAreaList(
        signUpInfo.location
      );

      setAreas(areas);
    }
  };
  useEffect(() => {
    getAreas();
  }, [signUpInfo.location]);

  const signUpInputHideOrShow = () => {
    return (
      <div className="alert alert-light alert-primary alert-icon mb-4 card-header">
        <i className="fas fa-exclamation-circle"></i>
        <span className="text-body">New customer?</span>{" "}
        <a
          className="text-primary collapse"
          onClick={handleSignUpForm}
          style={{ cursor: "pointer", color: "#3c6fb8" }}
        >
          Click here to sign up
        </a>
      </div>
    );
  };

  const nameInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Name *"
          onChange={signUpInputHandler}
          value={signUpInfo.name}
          onKeyUp={() =>
            signUpError.nameError &&
            setSignUpError({ ...signUpError, nameError: "" })
          }
        />
        <div
          style={{
            display: signUpError.nameError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.nameError ? signUpError.nameError : ""}
        </div>
      </div>
    );
  };

  const emailInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label>
          <span className="font-weight-bold">Email</span> (Not Changeable)*
        </label>
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
            onKeyDown={onKeyDown}
            type="email"
            className="form-control"
            name="email"
            placeholder="Email Address *"
            style={{
              backgroundColor: "white",
              border: "none",
            }}
            onChange={signUpInputHandler}
            value={signUpInfo.email}
          />
          {signUpInfo.email !== "" || signUpError.emailError ? (
            <>
              {signUpError.emailLoading ? (
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
              ) : signUpError.emailError ? (
                signUpError.emailError.data.errors.email ? (
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
              signUpInfo.email || signUpError.emailError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.emailError
            ? signUpError.emailError.data.errors.email
              ? signUpError.emailError.data.errors.email[0]
              : ""
            : ""}
        </div>
        <div
          style={{
            display:
              !signUpInfo.email && signUpError.emailTouched ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          This email field is required
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
          onChange={signUpInputHandler}
          value={signUpInfo.password}
          onKeyUp={() =>
            signUpError.passwordError &&
            setSignUpError({ ...signUpError, passwordError: "" })
          }
        />
        <div
          style={{
            display: signUpError.passwordError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.passwordError ? signUpError.passwordError : ""}
        </div>
      </div>
    );
  };

  const locationInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label htmlFor="location">City *</label>
        <select
          className="form-control"
          name="location"
          onChange={signUpInputHandler}
          value={signUpInfo.location}
          onClick={() =>
            signUpError.locationError &&
            setSignUpError({ ...signUpError, locationError: "" })
          }
        >
          <option>Select City</option>
          {locations.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div
          style={{
            display: signUpError.locationError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.locationError ? signUpError.locationError : ""}
        </div>
      </div>
    );
  };

  const areaInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label htmlFor="area">Area *</label>
        {areas.length > 0 ? (
          <select
            className="form-control"
            name="area"
            onChange={signUpInputHandler}
            value={signUpInfo.area}
            onClick={() =>
              signUpError.areaError &&
              setSignUpError({ ...signUpError, areaError: "" })
            }
          >
            <option>Select Area</option>
            {areas.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        ) : (
          <select
            className="form-control mb-0"
            disabled
            style={{ backgroundColor: "#e2e2e2" }}
          ></select>
        )}
        <div
          style={{
            display: signUpError.areaError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.areaError ? signUpError.areaError : ""}
        </div>
      </div>
    );
  };

  const phoneInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label>
          <span className="font-weight-bold">Phone Number</span> (Not
          Changeable)*
        </label>
        <div
          style={{
            display: "flex",
            position: "relative",
            border: "1px solid gainsboro",
          }}
        >
          <input
            onKeyUp={(e) => {
              fetchErrorMessagePhone(e);
            }}
            onKeyDown={onKeyDown}
            type="number"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Phone Number *"
            style={{
              backgroundColor: "white",
              border: "none",
            }}
            onChange={signUpInputHandler}
            value={signUpInfo.phone}
          />
          {signUpInfo.phone !== "" || signUpError.phoneError ? (
            <>
              {signUpError.phoneLoading ? (
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
              ) : signUpError.phoneError ? (
                signUpError.phoneError.data.errors.phone ? (
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
              signUpInfo.phone || signUpError.phoneError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.phoneError
            ? signUpError.phoneError.data.errors.phone
              ? signUpError.phoneError.data.errors.phone[0]
              : ""
            : ""}
        </div>
        <div
          style={{
            display:
              !signUpInfo.phone && signUpError.phoneTouched ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          This phone field is required
        </div>
      </div>
    );
  };

  const zipInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label htmlFor="zip">Zip *</label>
        <input
          type="text"
          className="form-control"
          id="zip"
          name="zip"
          placeholder="Zip *"
          onChange={signUpInputHandler}
          value={signUpInfo.zip}
          onKeyUp={() =>
            signUpError.zipError &&
            setSignUpError({ ...signUpError, zipError: "" })
          }
        />
        <div
          style={{
            display: signUpError.zipError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.zipError ? signUpError.zipError : ""}
        </div>
      </div>
    );
  };

  const addressInputField = () => {
    return (
      <div className="mb-4 mb-md-0">
        <label htmlFor="address">Address *</label>
        <textarea
          type="text"
          className="form-control"
          id="address"
          name="address"
          placeholder="Address *"
          onChange={signUpInputHandler}
          value={signUpInfo.address}
          onKeyUp={() =>
            signUpError.addressError &&
            setSignUpError({ ...signUpError, addressError: "" })
          }
        ></textarea>
        <div
          style={{
            display: signUpError.addressError ? "block" : "none",

            color: " #cb2431",
            marginLeft: "5px",
          }}
        >
          {signUpError.addressError ? signUpError.addressError : ""}
        </div>
      </div>
    );
  };

  const signUpSubmitButton = () => {
    return (
      <div className="link-group" style={{ marginTop: "5px" }}>
        {!signupButtonLoading ? (
          <button type="submit" className="btn btn-dark btn-rounded mb-4">
            Sign Up
          </button>
        ) : (
          <button className="btn btn-disabled btn-rounded mb-4">Sign Up</button>
        )}
      </div>
    );
  };
  return (
    <div className="card accordion">
      {signUpInputHideOrShow()}
      <form
        className="alert-body"
        id="alert-body1"
        style={{
          display: `${signUpForm ? "block" : "none"}`,
          border: "1px solid gray",
          padding: "15px",
          marginBottom: "25px",
        }}
        onSubmit={signUpHandleSubmit}
      >
        <div className="row cols-md-2 mt-3">
          {nameInputField()}
          {emailInputField()}
        </div>

        <div className="row cols-md-2 mt-3">
          {passwordInputField()}
          {locationInputField()}
        </div>
        <div className="row cols-md-2 mt-3">
          {areaInputField()}
          {phoneInputField()}
        </div>
        <div className="row cols-md-2 mt-3">
          {zipInputField()}
          {addressInputField()}
        </div>

        {signUpSubmitButton()}
      </form>
    </div>
  );
};

export default SignUpForCheckout;
