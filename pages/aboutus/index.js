import React from "react";
import Head from "next/head";
import AboutUsService from "../../services/AboutUsService";

// Banner and headline
const bannerAndHeadline = () => {
  return (
    <div
      className="page-header pl-4 pr-4"
      style={{ background: "white", height: "100px" }}
    >
      <h1
        className="page-title font-weight-bold lh-1 text-capitalize mt-5"
        style={{ color: "black" }}
      >
        About Us
      </h1>
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
      <main className="main mb-5">
        {bannerAndHeadline()}
        {aboutDetails(details)}
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async () => {
  const details = await AboutUsService.instance.getAboutUs();

  return {
    props: {
      details,
    },
    // revalidate: 10,
  };
};

export default Aboutus;
