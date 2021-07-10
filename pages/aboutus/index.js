import React from "react";
import Head from "next/head";
import AboutUsService from "../../services/AboutUsService";

// Banner and headline
const bannerAndHeadline = () => {
  return (
    <div
      className="page-header pl-4 pr-4"
      style={{ backgroundImage: "url(/images/page-header/about-us.jpg)" }}
    >
      <h3 className="page-subtitle font-weight-bold">Welcome To Owlet</h3>
      <h1 className="page-title font-weight-bold lh-1 text-white text-capitalize">
        About Us
      </h1>
      <p className="page-desc text-white mb-0">
        Lorem quis bibendum auctor, nisi elit consequat ipsum,
        <br /> nec sagittis sem nibh id elit.
      </p>
    </div>
  );
};

// Details section
const aboutDetails = (details) => {
  return (
    <div className="page-content">
      <div className="container mt-5">
        <div dangerouslySetInnerHTML={{ __html: details }} />
      </div>
    </div>
  );
};

const Aboutus = ({ details }) => {
  return (
    <React.Fragment>
      <Head>
        <title>About Us | The Owlet</title>
      </Head>
      <main className="main">
        {bannerAndHeadline()}
        {aboutDetails(details)}
      </main>
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  const details = await AboutUsService.instance.getAboutUs();

  return {
    props: {
      details,
    },
    // revalidate: 10,
  };
};

export default Aboutus;
