import axios from "axios";

import { based_url } from "../utils/constants";

export default class HomePageService {
  static instance = HomePageService.instance || new HomePageService();

  // Home page settings
  async getHomePageAllSettings() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const homePageAllSettingsResponse = await axios.get(
          based_url + "/home/page/setting"
        );
        // Expecting Home page settings from the response
        if (homePageAllSettingsResponse.data)
          return homePageAllSettingsResponse.data;
      } catch (error) {
        console.log(
          "Error in homePageAllSettings() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return {};
  }

  // Navigations
  async getNavigationUrlList() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getNavigationUrlListResponse = await axios.get(
          based_url + "/category/parent/list"
        );
        // Expecting a list from the response
        if (Array.isArray(getNavigationUrlListResponse.data))
          return getNavigationUrlListResponse.data;
      } catch (error) {
        console.log(
          "Error in getNavigationUrlList() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return [];
  }

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

  // Featured products
  async getFeaturedList() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getFeaturedResponse = await axios.get(
          based_url + "/featured/product/list/home"
        );
        // Expecting a list from the response
        if (Array.isArray(getFeaturedResponse.data))
          return getFeaturedResponse.data;
      } catch (error) {
        console.log(
          "Error in getFeaturedList() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return [];
  }

  // Homepage Banner Status
  async getHomePageBannerStatus() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getHomePageBannerStatusResponse = await axios.get(
          based_url + "/setting/show/home/image"
        );
        // Expecting a boolean from the response
        if (getHomePageBannerStatusResponse.data)
          return getHomePageBannerStatusResponse.data;
      } catch (error) {
        console.log(
          "Error in getHomePageBannerStatus() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return false;
  }

  // Homepage Banner
  async getHomePageBanner() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getHomePageBannerResponse = await axios.get(
          based_url + "/setting/home/banner/image"
        );
        // Expecting a string from the response
        if (getHomePageBannerResponse.data)
          return getHomePageBannerResponse.data;
      } catch (error) {
        console.log(
          "Error in getHomePageBanner() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return null;
  }

  // Homepage Metakeywords
  async getHomePageMetaKeywords() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getHomePageMetaKeywordsResponse = await axios.get(
          based_url + "/setting/meta/keyword"
        );
        // Expecting a string from the response
        if (getHomePageMetaKeywordsResponse.data)
          return getHomePageMetaKeywordsResponse.data;
      } catch (error) {
        console.log(
          "Error in getHomePageMetaKeywords() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return null;
  }

  // Homepage Metadescription
  async getHomePageMetaDescription() {
    let retry = 0;
    while (retry++ < 2) {
      try {
        const getHomePageMetaDescriptionResponse = await axios.get(
          based_url + "/setting/meta/description"
        );
        // Expecting a string from the response
        if (getHomePageMetaDescriptionResponse.data)
          return getHomePageMetaDescriptionResponse.data;
      } catch (error) {
        console.log(
          "Error in getHomePageMetaDescription() in services/HomePageService.js"
        );
        console.log(error);
      }
    }
    return null;
  }
}
