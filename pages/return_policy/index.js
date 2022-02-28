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
      <main className="main mb-5">
        <div
          className="page-header pl-4 pr-4"
          style={{ background: "white", height: "100px" }}
        >
          <h1
            className="page-title font-weight-bold lh-1 text-capitalize mt-5"
            style={{ color: "black" }}
          >
            Return Policy
          </h1>
        </div>
        <div className="page-content">
          <div className="container mt-5 pb-5">
            <div dangerouslySetInnerHTML={{ __html: details }} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export const getServerSideProps = async () => {
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
