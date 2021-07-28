import axios from "axios";

import { based_url } from "../utils/constants";

export default class HeaderService {
  static instance = HeaderService.instance || new HeaderService();

  // Location
  async categoryOnHoverSizes(id) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const categoryOnHoverSizesResponse = await axios.get(
          based_url + `/category/${id}/size/list`
        );
        // Expecting a list from the response
        if (categoryOnHoverSizesResponse.data) return categoryOnHoverSizesResponse.data;
      } catch (error) {
        console.log(
          "Error in categoryOnHoverSizes() in services/HeaderService.js"
        );
        console.log(error);
      }
    }
    return [];
  }
}
