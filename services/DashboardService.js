import axios from "axios";

import { based_url } from "../utils/constants";

export default class DashboardService {
  static instance = DashboardService.instance || new DashboardService();

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
          "Error in getLocationList() in services/DashboardService.js"
        );
        console.log(error);
      }
    }
    return [];
  }

  // For logout
  async logoutUser(token) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const logoutUserResponse = await axios(
          {
            method: "POST",
            url: `${based_url}/customer/logout`,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
          // based_url + "/customer/logout"
        );
        // Expecting a list from the response
        if (logoutUserResponse.data) return logoutUserResponse.data;
      } catch (error) {
        console.log("Error in logoutUser() in services/DashboardService.js");
        console.log(error);
      }
    }
    return "";
  }
}
