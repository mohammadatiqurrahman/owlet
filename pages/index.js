import React from "react";
import Head from "next/head";
import {
  BottomPage,
  Footer,
  Header,
  Banner,
  NewArrival,
  Category,
  FeaturedProduct,
  TopHeader,
} from "../components";

import HomePageService from "../services/HomePageService";

const index = ({
  // navigations,
  newArrival,
  featuredProduct,
  homePageBanner,
  homeImageStatus,
  metaDescription,
  metaKeyword,
  homePageAllSettings,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>Home Page | The Owlet</title>
        <meta property="og:title" content="Home Page | The Owlet" />
        <meta name="keywords" content={homePageAllSettings.meta_keyword} />
        <meta
          name="description"
          content={homePageAllSettings.meta_description}
        />
        <meta
          property="og:description"
          content={homePageAllSettings.meta_description}
        />
        {homePageAllSettings.show_banner_image == "1" && (
          <meta
            property="og:image"
            content={homePageAllSettings.banner_image}
          />
        )}
        <meta property="og:url" content="/" />
      </Head>
      {/* <div classNameName="page-wrapper"> */}
      {/* <TopHeader /> */}
      {/* <Header navigations={navigations} /> */}
      <main className="main home">
        <div className="page-content">
          <div className="container">
            {homePageAllSettings.show_banner_image == "1" && (
              <Banner homePageBanner={homePageAllSettings.banner_image} />
            )}
            <Category />
            <NewArrival newArrival={newArrival} />
            <FeaturedProduct featuredProduct={featuredProduct} />
          </div>
        </div>
      </main>
      {/* <Footer /> */}
      {/* </div> */}
      {/* <BottomPage /> */}
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const newArrival = await HomePageService.instance.getNewArrivalList();

  const featuredProduct = await HomePageService.instance.getFeaturedList();

  // const homeImageStatus =
  //   await HomePageService.instance.getHomePageBannerStatus();

  // const homePageBanner = await HomePageService.instance.getHomePageBanner();

  // const metaKeyword = await HomePageService.instance.getHomePageMetaKeywords();

  // const metaDescription =
  //   await HomePageService.instance.getHomePageMetaDescription();

  const homePageAllSettings =
    await HomePageService.instance.getHomePageAllSettings();

  return {
    props: {
      // navigations,
      newArrival,
      featuredProduct,
      // homeImageStatus,
      // homePageBanner,
      // metaDescription,
      // metaKeyword,
      homePageAllSettings,
    },
    revalidate: 10,
  };
};

export default index;
