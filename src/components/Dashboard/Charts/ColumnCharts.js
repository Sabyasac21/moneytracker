import React, { useEffect } from "react";
import { Column } from "@ant-design/charts";

const ColumnChart = (props) => {
  const data = props.value;
  

  const config = {
    data,
    xField: "day",
    yField: "expense",
    autoFit: true,
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    events: {
      click: (evt) => { // Handle click event on the entire chart
        console.log("Chart clicked:", evt);
        // You can check evt.x or evt.y to determine the clicked area (approx.)
      },}

   
  };

  return (
    <div style={{ width: "100%", height: 360 }}>
      {data && <Column {...config} />}
    </div>
  );
};

export default ColumnChart;
