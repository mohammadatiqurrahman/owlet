import React from "react";
import { Calculations } from "../../components";
import Head from "next/head";
const index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Cart | The Owlet</title>
      </Head>
      <main className="main cart">
        <div className="page-content pt-7 pb-10">
          {/* <Buttons /> */}
          <Calculations />
        </div>
      </main>
    </React.Fragment>
  );
};

export default index;
