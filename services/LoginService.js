import axios from "axios";

import { based_url } from "../utils/constants";

export default class LoginService {
  static instance = LoginService.instance || new LoginService();

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
}
