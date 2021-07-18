import axios from "axios";

import { based_url } from "../utils/constants";

export default class ContextService {
  static instance = ContextService.instance || new ContextService();

  async getOrders(token) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getOrdersResponse = await axios({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          url: `${based_url}/order/list`,
        });
        // Expecting an Array from the response
        if (getOrdersResponse.data) return getOrdersResponse.data;
      } catch (error) {
        console.log("Error in getOrders() in services/ContextService.js");
        console.log(error);
      }
    }
    return [];
  }

  //Login Submit
  async loginUser(email, password) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const loginUserResponse = await axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          url: `${based_url}/customer/login`,
          data: JSON.stringify({ email, password }),
        });
        // Expecting an Array from the response
        if (loginUserResponse.data) return loginUserResponse.data;
      } catch (error) {
        console.log("Error in loginUser() in services/ContextService.js");
        console.log(error);
      }
    }
    return [];
  }

  //Signup Submit
  async signupUser(signUpInfo) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const signupUserResponse = await axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          url: `${based_url}/customer/register`,
          data: JSON.stringify(signUpInfo),
        });
        // Expecting an Array from the response
        if (signupUserResponse.data) return signupUserResponse.data;
      } catch (error) {
        console.log("Error in signupUser() in services/ContextService.js");
        console.log(error);
      }
    }
    return [];
  }
}
