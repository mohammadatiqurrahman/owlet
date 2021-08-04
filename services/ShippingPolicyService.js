import axios from "axios";

import { based_url } from "../utils/constants";

export default class ShippingPolicyService {
  static instance =
    ShippingPolicyService.instance || new ShippingPolicyService();

  // Location
  async getShippingPolicyDetails() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getShippingPolicyDetailsResponse = await axios.get(
          based_url + "/page/shipping_policy"
        );
        // Expecting a string from the response
        if (getShippingPolicyDetailsResponse.data)
          return getShippingPolicyDetailsResponse.data;
      } catch (error) {
        console.log(
          "Error in getShippingPolicyDetails() in services/CheckoutService.js"
        );
        console.log(error);
      }
    }
    return null;
  }
}
