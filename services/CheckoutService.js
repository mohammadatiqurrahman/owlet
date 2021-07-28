import axios from "axios";

import { based_url } from "../utils/constants";

export default class CheckoutService {
  static instance = CheckoutService.instance || new CheckoutService();

  // Location
  async getLocationList() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getLocationListResponse = await axios.get(
          based_url + "/location/list"
        );
        // Expecting a list from the response
        if (Array.isArray(getLocationListResponse.data))
          return getLocationListResponse.data;
      } catch (error) {
        console.log(
          "Error in getLocationList() in services/CheckoutService.js"
        );
        console.log(error);
      }
    }
    return [];
  }

  // Location wise area
  async getLocationWiseAreaList(location) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getLocationWiseAreaListResponse = await axios.get(
          based_url + `/location/${location}/area/list`
        );
        // Expecting a list from the response
        if (Array.isArray(getLocationWiseAreaListResponse.data))
          return getLocationWiseAreaListResponse.data;
      } catch (error) {
        console.log(
          "Error in getLocationWiseAreaList() in services/CheckoutService.js"
        );
        console.log(error);
      }
    }
    return [];
  }

  // Shipping Charge for in Dhaka
  async getInDhakaShippingCharge() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getInDhakaShippingChargeResponse = await axios.get(
          based_url + "/setting/charge/inside_dhaka"
        );
        // Expecting a String from the response
        if (getInDhakaShippingChargeResponse.data)
          return getInDhakaShippingChargeResponse.data;
      } catch (error) {
        console.log(
          "Error in getInDhakaShippingCharge() in services/CheckoutService.js"
        );
        console.log(error);
      }
    }
    return null;
  }

  // Shipping Cost out side dhaka
  async getOutDhakaShippingCharge() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getOutDhakaShippingChargeResponse = await axios.get(
          based_url + "/setting/charge/outside_dhaka"
        );
        // Expecting a string from the response
        if (getOutDhakaShippingChargeResponse.data)
          return getOutDhakaShippingChargeResponse.data;
      } catch (error) {
        console.log(
          "Error in getOutDhakaShippingCharge() in services/CheckoutService.js"
        );
        console.log(error);
      }
    }
    return null;
  }

  // Registered user checkout
  async registeredUserCheckout(invoice, user) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const registeredUserCheckoutResponse = await axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${user ? "Bearer " + user.customer.token : ""}`,
          },
          url: `${based_url}/order/by_customer`,
          data: invoice,
        });
        console.log(registeredUserCheckoutResponse);
        // Expecting a object from the response
        if (registeredUserCheckoutResponse.data)
          return registeredUserCheckoutResponse.data;
      } catch (error) {
        console.log(
          "Error in registeredUserCheckout() in services/CheckoutService.js"
        );
        console.log(error);
      }
    }
    return null;
  }

  // Guest checkout
  async guestCheckout(invoice) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const guestCheckoutResponse = await axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          url: `${based_url}/order/by_guest`,
          data: invoice,
        });
        // Expecting a object from the response
        if (guestCheckoutResponse.data) return guestCheckoutResponse.data;
      } catch (error) {
        console.log("Error in guestCheckout() in services/CheckoutService.js");
        console.log(error);
      }
    }
    return null;
  }
}
