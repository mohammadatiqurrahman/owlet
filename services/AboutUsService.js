import axios from "axios";

import { based_url } from "../utils/constants";

export default class AboutUsService {
  static instance = AboutUsService.instance || new AboutUsService();

  // Location
  async getAboutUs() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getAboutUsResponse = await axios.get(based_url + "/page/about");
        // Expecting a list from the response
        if (getAboutUsResponse.data) return getAboutUsResponse.data;
      } catch (error) {
        console.log("Error in getAboutUs() in services/AboutUsService.js");
        console.log(error);
      }
    }
    return "";
  }
}
