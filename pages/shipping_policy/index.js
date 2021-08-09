import React from "react";
import Head from "next/head";
import ShippingPolicyService from "../../services/ShippingPolicyService";
const index = ({ details }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Shipping Policy | The Owlet</title>
      </Head>
      <main className="main">
        <div
          className="page-header pl-4 pr-4"
          style={{ background: "white", height: "100px" }}
        >
          <h1
            className="page-title font-weight-bold lh-1 text-capitalize mt-5"
            style={{ color: "black" }}
          >
            Shipping Policy
          </h1>
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
  // const aboutRes = await fetch(`${based_url}/page/shipping_policy`);
  // const details = await aboutRes.json();
  const details =
    await ShippingPolicyService.instance.getShippingPolicyDetails();
  return {
    props: {
      details,
    },
    // revalidate: 10,
  };
};

export default index;
