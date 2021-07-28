import React, { useEffect, useState } from "react";
import { useProductsContext } from "../context/products_context";
import BottomPage from "./BottomPage";
import Footer from "./Footer";
import Header from "./Header";
import { based_url } from "../utils/constants";
import { useRouter } from "next/router";
import TopHeader from "../components/TopHeader";
const Layout = ({ children }) => {
  const { navigations } = useProductsContext();
  // console.log(navigations);
  const [newArrival, setNewArrival] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const getSpecialNav = async () => {
    const newArrivalRes = await fetch(`${based_url}/setting/show/new_arrival`);
    const newArrivalStatus = await newArrivalRes.json();
    setNewArrival(newArrivalStatus);
    const onSaleRes = await fetch(`${based_url}/setting/show/on_sale`);
    const onSaleStatus = await onSaleRes.json();
    setOnSale(onSaleStatus);
  };

  const router = useRouter();
  // console.log(router);
  const { pathname } = router;
  useEffect(() => {
    getSpecialNav();
  }, []);
  return (
    <>
      {pathname === "/" && <TopHeader />}
      <Header
        navigations={navigations}
        newArrival={newArrival}
        onSale={onSale}
      />
      {children}
      <Footer />
      <BottomPage
        navigations={navigations}
        newArrival={newArrival}
        onSale={onSale}
      />
    </>
  );
};

export default Layout;
