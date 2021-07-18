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
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>Home Page | The Owlet</title>

        <meta name="keywords" content={metaKeyword} />
        <meta name="description" content={metaDescription} />
      </Head>
      {/* <div classNameName="page-wrapper"> */}
      {/* <TopHeader /> */}
      {/* <Header navigations={navigations} /> */}
      <main className="main home">
        <div className="page-content">
          <div className="container">
            {homeImageStatus && <Banner homePageBanner={homePageBanner} />}
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

  const homeImageStatus =
    await HomePageService.instance.getHomePageBannerStatus();

  const homePageBanner = await HomePageService.instance.getHomePageBanner();

  const metaKeyword = await HomePageService.instance.getHomePageMetaKeywords();

  const metaDescription =
    await HomePageService.instance.getHomePageMetaDescription();

  return {
    props: {
      // navigations,
      newArrival,
      featuredProduct,
      homeImageStatus,
      homePageBanner,
      metaDescription,
      metaKeyword,
    },
    // revalidate: 10,
  };
};

export default index;
