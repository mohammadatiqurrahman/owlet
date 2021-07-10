import axios from "axios";

import { based_url } from "../utils/constants";

export default class ProductsService {
  static instance = ProductsService.instance || new ProductsService();

  // New Arrival
  async relatedProductlList(slug) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const relatedProductlListResponse = await axios.get(
          based_url + `/parent/category/${slug}/product/list`
        );
        // Expecting a list from the response
        if (Array.isArray(relatedProductlListResponse.data))
          return relatedProductlListResponse.data;
      } catch (error) {
        console.log(
          "Error in relatedProductlList() in services/ProductsService.js"
        );
        console.log(error);
      }
    }
    return [];
  }
}
