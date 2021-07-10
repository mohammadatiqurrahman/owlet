import axios from "axios";

import { based_url } from "../utils/constants";

export default class ContactService {
  static instance = ContactService.instance || new ContactService();

  async postContactInformation(contactInformation) {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const postContactInformationResponse = await axios({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          url: `${based_url}/message/store`,
          data: contactInformation,
        });
        // Expecting a object from the response
        if (postContactInformationResponse.data)
          return postContactInformationResponse.data;
      } catch (error) {
        console.log(
          "Error in postContactInformation() in services/ContactService.js"
        );
        console.log(error);
      }
    }
    return null;
  }
}
