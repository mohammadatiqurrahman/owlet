import React, { useEffect, useState } from "react";
import { useProductsContext } from "../context/products_context";
import BottomPage from "./BottomPage";
import Footer from "./Footer";
import Header from "./Header";
import { based_url } from "../utils/constants";
import HomePageService from "../services/HomePageService";
import { useRouter } from "next/router";
import TopHeader from "../components/TopHeader";
const Layout = ({ children }) => {
  const { navigations } = useProductsContext();
  const [homeSettings, setHomeSettings] = useState({});

  const getSpecialNav = async () => {
    // const newArrivalRes = await fetch(`${based_url}/setting/show/new_arrival`);
    // const newArrivalStatus = await newArrivalRes.json();
    // setNewArrival(newArrivalStatus);
    // const onSaleRes = await fetch(`${based_url}/setting/show/on_sale`);
    // const onSaleStatus = await onSaleRes.json();
    // setOnSale(onSaleStatus);
    const homePageAllSettings =
      await HomePageService.instance.getHomePageAllSettings();
    setHomeSettings(homePageAllSettings);
  };

  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    getSpecialNav();
  }, []);
  return (
    <>
      {pathname === "/" && <TopHeader />}
      <div>
        <Header
          navigations={navigations}
          newArrival={homeSettings.show_new_arrival == "1" ? true : false}
          onSale={homeSettings.show_on_sale == "1" ? true : false}
          mainlogo={homeSettings.logo}
        />
        {children}
        <Footer />
      </div>
      <BottomPage
        navigations={navigations}
        newArrival={homeSettings.show_new_arrival == "1" ? true : false}
        onSale={homeSettings.show_on_sale == "1" ? true : false}
      />
    </>
  );
};

export default Layout;
