import React from "react";
import { Bar } from "@ant-design/charts";
import './BarChart.css'

const BarCharts = (props) => {
  const data = props.value
  const config = {
    data,
    height: 300,
    width: 300,
    xField: "day",
    yField: "expense",
    
    
    

  };
  return (
    <div className="barchart" >
      <Bar {...config} />
    </div>
  );
};

export default BarCharts;
