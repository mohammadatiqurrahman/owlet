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
          "Error in getNewArrivalList() in services/CollectionPageService.js"
        );
        console.log(error);
      }
    }
    return [];
  }

  async getCategoryList() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getCategoryListResponse = await axios.get(
          based_url + "/category/list"
        );
        // Expecting a list from the response
        if (Array.isArray(getCategoryListResponse.data))
          return getCategoryListResponse.data;
      } catch (error) {
        console.log(
          "Error in getCategoryList() in services/CollectionPageService.js"
        );
        console.log(error);
      }
    }
    return [];
  }

  async getParentCategoryList() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getParentCategoryListResponse = await axios.get(
          based_url + "/category/parent/list"
        );
        // Expecting a list from the response
        if (Array.isArray(getParentCategoryListResponse.data))
          return getParentCategoryListResponse.data;
      } catch (error) {
        console.log(
          "Error in getParentCategoryList() in services/CollectionPageService.js"
        );
        console.log(error);
      }
    }
    return [];
  }
}
