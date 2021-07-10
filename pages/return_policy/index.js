import React from "react";
import { based_url } from "../../utils/constants";
import Head from "next/head";
import ReturnPolicyService from "../../services/ReturnPolicyService";
const Returnpolicy = ({ details }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Return Policy | The Owlet</title>
      </Head>
      <main className="main">
        <div
          className="page-header pl-4 pr-4"
          style={{ backgroundImage: "url(/images/page-header/about-us.jpg)" }}
        >
          <h1 className="page-title font-weight-bold lh-1 text-white text-capitalize">
            Return Policy
          </h1>
          <p className="page-desc text-white mb-0">
            Lorem quis bibendum auctor, nisi elit consequat ipsum,
            <br /> nec sagittis sem nibh id elit.
          </p>
        </div>
        <div className="page-content">
          <div className="container mt-5">
            <div dangerouslySetInnerHTML={{ __html: details }} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export const getStaticProps = async () => {
  // const aboutRes = await fetch(`${based_url}/page/return_policy`);
  // const details = await aboutRes.json();
  const details = await ReturnPolicyService.instance.getReturnPolicyDetails();

  return {
    props: {
      details,
    },
    // revalidate: 10,
  };
};

export default Returnpolicy;
