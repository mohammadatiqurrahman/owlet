import axios from "axios";

import { based_url } from "../utils/constants";

export default class ForgetPasswordService {
  static instance =
    ForgetPasswordService.instance || new ForgetPasswordService();

  // Send Forget password link to the mail
  async forgetPassword(email) {

    let retry = 0;
    while (retry++ < 2) {
      try {
        const forgetPasswordResponse = await axios({
          method: "POST",
          url: `${based_url}/customer/send/reset_email`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: JSON.stringify({ email }),
        });
        // Expecting a object from the response
        if (forgetPasswordResponse.data) return forgetPasswordResponse.data;
      } catch (error) {
        console.log(
          "Error in forgetPassword() in services/ForgetPasswordService.js"
        );
        console.log(error);
      }
    }
    return null;
  }

  // Check forget password mail, that is available on database
  async checkForgetPasswordMail(email) {

    let retry = 0;
    while (retry++ < 2) {
      try {
        const checkForgetPasswordMailResponse = await axios({
          method: "POST",
          url: `${based_url}/customer/check/reset_email`,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: JSON.stringify({ email }),
        });
        // Expecting a object from the response
        if (checkForgetPasswordMailResponse.data)
          return checkForgetPasswordMailResponse.data;
      } catch (error) {
        console.log(
          "Error in checkForgetPasswordMail() in services/ForgetPasswordService.js"
        );
        console.log(error);
      }
    }
    return null;
  }
}
