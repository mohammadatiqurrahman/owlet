import axios from "axios";

import { based_url } from "../utils/constants";

export default class OrderTrackingService {
  static instance = OrderTrackingService.instance || new OrderTrackingService();

  // Location
  async getOrderStatus(order) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getOrderStatusResponse = await axios({
          method: "POST",
          url: `${based_url}/order/tracking`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: JSON.stringify({ invoice: order.orderNumber }),
        });
        // Expecting a list from the response
        if (Array.isArray(getOrderStatusResponse.data))
          return getOrderStatusResponse.data;
      } catch (error) {
        console.log(
          "Error in getOrderStatus() in services/OrderTrackingService.js"
        );
        console.log(error);
      }
    }
    return [];
  }
}
