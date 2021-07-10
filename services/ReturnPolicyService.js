import axios from "axios";

import { based_url } from "../utils/constants";

export default class ReturnPolicyService {
  static instance = ReturnPolicyService.instance || new ReturnPolicyService();

  // Location
  async getReturnPolicyDetails() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getReturnPolicyDetailsResponse = await axios.get(
          based_url + "/page/return_policy"
        );
        // Expecting a string from the response
        if (getReturnPolicyDetailsResponse.data)
          return getReturnPolicyDetailsResponse.data;
      } catch (error) {
        console.log(
          "Error in getReturnPolicyDetails() in services/CheckoutService.js"
        );
        console.log(error);
      }
    }
    return null;
  }
}
