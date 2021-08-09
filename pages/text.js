import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const text = () => {
  // const [value, setValue] = useState(20);
  const [value, setValue] = useState({ max: 90, min: 3 });
  return (
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
  );
};

export default text;
