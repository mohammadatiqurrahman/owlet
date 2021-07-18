import React, { useContext, useEffect, useState } from "react";
import { based_url } from "../utils/constants";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import axios from "axios";
import ContextService from "../services/ContextService";
const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const getUserFromLocalStorage = () => {
    let tempUser = localStorage.getItem("user");
    if (tempUser) {
      setUser(JSON.parse(localStorage.getItem("user")));
      return;
    }
    setUser(null);
  };
  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  // Receiving new order based on-change of user.
  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  const [order, setOrder] = useState([]);
  const getOrders = async () => {
    const orders = await ContextService.instance.getOrders(user.customer.token);

    if (orders.message === "Unauthenticated") {
      setOrder([]);
    } else {
      setOrder(orders);
    }
  };

  const [loginButtonLoading, setLoginButtonLoading] = useState(false);
  const [loginInfoError, setLoginInfoError] = useState({
    passwordError: "",
    passwordTouched: false,
    emailError: "",
    emailTouched: false,
    loginFail: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const loginInputHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    if (!loginInfo.password || !loginInfo.email) {
      setLoginInfoError({
        ...loginInfoError,
        passwordError: loginInfo.password
          ? ""
          : "The password field is required.",
        emailError: loginInfo.email ? "" : "The email field is required",
      });
      return;
    }
    setLoginButtonLoading(true);
    const user = await ContextService.instance.loginUser(
      loginInfo.email,
      loginInfo.password
    );
    if (user.loggedin === true) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      if (
        router.pathname === "/before_checkout" ||
        router.pathname === "/guest_checkout"
      ) {
        setLoginInfo({ ...loginInfo, email: "", password: "" });
        await router.push("/checkout");
        setLoginButtonLoading(false);
      }
      if (router.pathname === "/login") {
        setLoginInfo({ ...loginInfo, email: "", password: "" });
        setLoginButtonLoading(false);
        router.push("/dashboard");
      }
    } else {
      setLoginInfoError({ ...loginInfoError, loginFail: user.errors });
    }
  };
  useEffect(() => {
    if (loginInfoError.loginFail) {
      toast.error(`${loginInfoError.loginFail}`);
      setLoginButtonLoading(false);
    }
  }, [loginInfoError.loginFail]);


  const [signupButtonLoading, setSignupButtonLoading] = useState(false);
  const [signUpError, setSignUpError] = useState({
    nameError: "",
    emailError: "",
    emailTouched: false,
    emailLoading: false,
    phoneError: "",
    phoneTouched: false,
    phoneLoading: false,
    locationError: "",
    areaError: "",
    zipError: "",
    addressError: "",
    passwordError: "",
  });
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    area: "",
    zip: "",
    address: "",
    password: "",
  });

  const getErrorMessageEmail = async (emailValue) => {
    setSignUpError({ ...signUpError, emailLoading: true });
    const emailError = await axios.post(`${based_url}/customer/check/email`, {
      email: emailValue,
    });

    setSignUpError({
      ...signUpError,
      emailError,
      emailTouched: true,
      emailLoading: false,
    });
  };
  const getErrorMessagePhone = async (phoneValue) => {
    setSignUpError({ ...signUpError, phoneLoading: true });
    const phoneError = await axios.post(`${based_url}/customer/check/phone`, {
      phone: phoneValue,
    });

    setSignUpError({
      ...signUpError,
      phoneError,
      phoneTouched: true,
      phoneLoading: false,
    });
  };

  const signUpInputHandler = async (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  const signUpHandleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signUpInfo.name ||
      !signUpInfo.email ||
      !signUpInfo.phone ||
      !signUpInfo.location ||
      !signUpInfo.area ||
      !signUpInfo.zip ||
      !signUpInfo.address ||
      !signUpInfo.password
    ) {
      setSignupButtonLoading(false);
      setSignUpError({
        ...signUpError,
        nameError: signUpInfo.name ? "" : "The name field is required.",
        emailError: signUpInfo.email
          ? ""
          : {
              data: {
                errors: { email: ["The email field is required"] },
              },
            },
        phoneError: signUpInfo.phone
          ? ""
          : {
              data: {
                errors: { phone: ["The phone field is required "] },
              },
            },
        locationError: signUpInfo.location
          ? ""
          : "The location field is required",
        areaError: signUpInfo.area ? "" : "The area field is required",
        zipError: signUpInfo.zip ? "" : "The zip field is required",
        addressError: signUpInfo.address ? "" : "The address field is required",
        passwordError: signUpInfo.password
          ? ""
          : "The password field is required",
      });
      return;
    }
    setSignupButtonLoading(true);
    const user = await ContextService.instance.signupUser(signUpInfo);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    if (
      router.pathname === "/before_checkout" ||
      router.pathname === "/guest_checkout"
    ) {
      setSignUpInfo({
        ...signUpInfo,
        name: "",
        email: "",
        phone: "",
        location: "",
        area: "",
        zip: "",
        address: "",
        password: "",
      });
      setSignUpError({
        ...signUpError,
        emailError: "",
        emailTouched: false,
        emailLoading: false,
        phoneError: "",
        phoneLoading: false,
        phoneTouched: false,
      });
      await router.push("/checkout");
      setSignupButtonLoading(false);
    }
    if (router.pathname === "/login") {
      setSignUpInfo({
        ...signUpInfo,
        name: "",
        email: "",
        phone: "",
        location: "",
        area: "",
        zip: "",
        address: "",
        password: "",
      });
      setSignUpError({
        ...signUpError,
        emailError: "",
        emailTouched: false,
        emailLoading: false,
        phoneError: "",
        phoneLoading: false,
        phoneTouched: false,
      });
      router.push("/dashboard");
      setSignupButtonLoading(false);
    }
  };
  // Init a timeout variable to be used below
  let timeout = null;
  const fetchErrorMessageEmail = (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (signUpInfo.email !== "") {
        getErrorMessageEmail(event.target.value);
      }
    }, 1000);
  };

  const fetchErrorMessagePhone = (event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (signUpInfo.phone !== "") {
        getErrorMessagePhone(event.target.value);
      }
    }, 1000);
  };

  const onKeyDownEmail = () => {
    clearTimeout(timeout);
    setSignUpError({ ...signUpError, emailError: "" });
  };
  const onKeyDownPhone = () => {
    clearTimeout(timeout);
    setSignUpError({ ...signUpError, phoneError: "" });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        order,
        loginInfoError,
        setLoginInfoError,
        loginInputHandler,
        loginHandleSubmit,
        loginInfo,
        loginButtonLoading,
        setSignUpError,
        signUpError,
        signUpInfo,
        signUpInputHandler,
        signUpHandleSubmit,
        fetchErrorMessageEmail,
        fetchErrorMessagePhone,
        onKeyDownEmail,
        onKeyDownPhone,
        signupButtonLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
