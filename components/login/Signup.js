import React, { useState, useEffect } from "react";
import SyncLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useRouter } from "next/router";
import { based_url } from "../../utils/constants";
import { useUserContext } from "../../context/user_context";
import Link from "next/link";
const Signup = ({ locations }) => {
  // console.log(locations);
  const router = useRouter();
  const {
    signUpError,
    setSignUpError,
    signUpInfo,
    signUpInputHandler,
    signUpHandleSubmit,
    fetchErrorMessageEmail,
    fetchErrorMessagePhone,
    onKeyDownEmail,
    onKeyDownPhone,
    signupButtonLoading,
  } = useUserContext();

  // Location and Area Funtionality start
  const getAreas = async () => {
    if (signUpInfo.location) {
      const areaRes = await fetch(
        `${based_url}/location/${signUpInfo.location}/area/list`
      );
      const areas = await areaRes.json();
      setAreas(areas);
    }
  };
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    getAreas();
  }, [signUpInfo.location]);

  return (
    <form onSubmit={signUpHandleSubmit}>
      <div className="row">
        <div className="col-md-6 form-group mb-3">
          <label className="font-weight-bold">Name*</label>
          <div
            style={{
              display: "flex",
              position: "relative",
              border: "1px solid gainsboro",
            }}
          >
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name *"
              style={{
                backgroundColor: "white",
                border: "none",
              }}
              onChange={signUpInputHandler}
              value={signUpInfo.name}
              onKeyUp={() =>
                signUpError.nameError &&
                setSignUpError({ ...signUpError, nameError: "" })
              }
            />
          </div>
          <div
            style={{
              display: signUpError.nameError ? "block" : "none",
              fontSize: "60%",
              color: " #cb2431",
              marginLeft: "5px",
            }}
          >
            {signUpError.nameError ? signUpError.nameError : ""}
          </div>
        </div>
        <div className="col-md-6 form-group mb-3">
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
              fontSize: "60%",
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
                !signUpInfo.email && signUpError.emailTouched
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

        {/* Phone Number form */}
        <div className="col-md-6 form-group mb-3">
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
              onKeyDown={onKeyDownPhone}
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
              fontSize: "60%",
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
                !signUpInfo.phone && signUpError.phoneTouched
                  ? "block"
                  : "none",
              fontSize: "60%",
              color: " #cb2431",
              marginLeft: "5px",
            }}
          >
            This phone field is required
          </div>
        </div>
        <div className="col-md-6 form-group">
          <label className="font-weight-bold">Location *</label>
          <select
            className="form-control"
            name="location"
            onChange={signUpInputHandler}
            value={signUpInfo.location}
            style={{ backgroundColor: "white" }}
            onClick={() =>
              signUpError.locationError &&
              setSignUpError({ ...signUpError, locationError: "" })
            }
          >
            <option>Select Location</option>
            {locations &&
              locations.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <div
            style={{
              display: signUpError.locationError ? "block" : "none",
              fontSize: "60%",
              color: " #cb2431",
              marginLeft: "5px",
            }}
          >
            {signUpError.locationError ? signUpError.locationError : ""}
          </div>
        </div>
        <div className="col-md-6 form-group">
          <label className="font-weight-bold">Select Area *</label>
          {areas.length > 0 ? (
            <select
              className="form-control"
              name="area"
              style={{ backgroundColor: "white" }}
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
              fontSize: "60%",
              color: " #cb2431",
              marginLeft: "5px",
            }}
          >
            {signUpError.areaError ? signUpError.areaError : ""}
          </div>
        </div>

        <div className="col-md-6 form-group">
          <label className="font-weight-bold">Zip *</label>
          <input
            type="text"
            className="form-control"
            id="zip"
            name="zip"
            placeholder="Zip *"
            style={{ backgroundColor: "white" }}
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
              fontSize: "60%",
              color: " #cb2431",
              marginLeft: "5px",
            }}
          >
            {signUpError.zipError ? signUpError.zipError : ""}
          </div>
        </div>
        <div className="col-md-6 form-group">
          <label className="font-weight-bold">Address *</label>
          <textarea
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Address *"
            style={{ backgroundColor: "white" }}
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
              fontSize: "60%",
              color: " #cb2431",
              marginLeft: "5px",
            }}
          >
            {signUpError.addressError ? signUpError.addressError : ""}
          </div>
        </div>
        <div className="col-md-6 form-group">
          <label className="font-weight-bold">Password *</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password *"
            style={{ backgroundColor: "white" }}
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
              fontSize: "60%",
              color: " #cb2431",
              marginLeft: "5px",
            }}
          >
            {signUpError.passwordError ? signUpError.passwordError : ""}
          </div>
        </div>
      </div>

      <p>
        By signing up, you are agreeing to our{" "}
        <Link href="/terms_and_condition">
          <span style={{ color: "#3c6fb8", cursor: "pointer" }}>
            Terms of Use
          </span>
        </Link>{" "}
        and{" "}
        <Link href="/privacy_policy">
          <span style={{ color: "#3c6fb8", cursor: "pointer" }}>
            Privacy Policy
          </span>
        </Link>
        .
      </p>
      {!signupButtonLoading ? (
        <button className="btn btn-dark btn-block btn-rounded" type="submit">
          Sign Up
        </button>
      ) : (
        <button className="btn btn-disabled btn-block btn-rounded">
          Processing...
        </button>
      )}
    </form>
  );
};

export default Signup;
