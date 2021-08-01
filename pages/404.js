import Link from "next/link";
import React from "react";

const Custom404 = () => {
  return (
    <main className="main">
      <div className="page-content">
        <section className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3">
          <h1 className="mb-2 ls-m">Error 404</h1>
          <img
            src="images/subpages/404.png"
            alt="error 404"
            width="609"
            height="131"
          />
          <h4 className="mt-7 mb-0 ls-m text-uppercase">
            Oops! It's looking like you flew the wrong way!
          </h4>

          <Link href="/">
            <a className="btn btn-primary btn-rounded mb-4">Go To Homepage</a>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Custom404;
