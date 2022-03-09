import React, { useState } from "react";

const TopHeader = ({title}) => {
  const [topHeader, setTopHeader] = useState(true);

  return (
    <div
      className="text-center top-navbar"
      style={{ display: `${topHeader ? "block" : "none"}` }}
    >
      <div className="container alert alert-dark border-no font-primary text-dark justify-content-center">
        {title}
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
