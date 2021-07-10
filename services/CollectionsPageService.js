import axios from "axios";

import { based_url } from "../utils/constants";

export default class CollectionsPageService {
  static instance =
    CollectionsPageService.instance || new CollectionsPageService();

  // New Arrival
  async getNewArrivalList() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getNewArrivalListResponse = await axios.get(
          based_url + "/new_arrival/product/list/home"
        );
        // Expecting a list from the response
        if (Array.isArray(getNewArrivalListResponse.data))
          return getNewArrivalListResponse.data;
      } catch (error) {
        console.log(
          "Error in getNewArrivalList() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return [];
  }
}
