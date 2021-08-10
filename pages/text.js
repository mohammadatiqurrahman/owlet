import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ContentLoader, { Facebook } from "react-content-loader";

const text = () => {
  // const [value, setValue] = useState(20);
  const [value, setValue] = useState({ max: 90, min: 3 });
  return (
    <>
      <ContentLoader>
    {/* Only SVG shapes */}    
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
      <div style={{ width: "200px", marginLeft: "30px" }}>
        <InputRange
          // draggableTrack
          maxValue={120}
          minValue={0}
          onChange={(value) => {
            setValue({ ...value, max: value.max, min: value.min });
            console.log(value);
          }}
          onChangeComplete={() => console.log(value)}
          value={value}
        />
      </div>
    </>
  );
};

export default text;
