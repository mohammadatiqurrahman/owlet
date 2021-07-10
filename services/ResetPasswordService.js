import axios from "axios";

import { based_url } from "../utils/constants";

export default class ResetPasswordService {
  static instance = ResetPasswordService.instance || new ResetPasswordService();

  // Reset Password
  async updatePassword(updateInformation) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const updatePasswordResponse = await axios({
          method: "POST",
          url: `${based_url}/customer/update/password`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: JSON.stringify(updateInformation),
        });
        // Expecting a object from the response
        if (updatePasswordResponse.data) return updatePasswordResponse.data;
      } catch (error) {
        console.log(
          "Error in updatePassword() in services/ResetPasswordService.js"
        );
        console.log(error);
      }
    }
    return null;
  }
}
