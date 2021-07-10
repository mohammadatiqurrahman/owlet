import React, { useState } from "react";

const TopHeader = () => {
  const [topHeader, setTopHeader] = useState(true);

  return (
    <div
      className="text-center top-navbar"
      style={{ display: `${topHeader ? "block" : "none"}` }}
    >
      <div className="container alert alert-dark border-no font-primary text-dark justify-content-center">
        Get Up to 40% OFF in this summer
        <button
          type="button"
          className="btn btn-link btn-close"
          onClick={() => setTopHeader(false)}
        >
          <i className="d-icon-times"></i>
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
