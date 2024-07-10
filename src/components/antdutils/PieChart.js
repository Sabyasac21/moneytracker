import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import chroma from 'chroma-js'

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// Function to generate colors
const generateColors = (numColors) => {
  return chroma.scale(['#f00', '#0f0', '#00f']).mode('lch').colors(numColors);
};
const CustomPieChart = (props) => {
  const data = props.value;
  const colors = generateColors(data.length)
  const tooltipFormatter = (value, name, props) => {
    return [`${Math.round(value)}%`, `${props.payload.type}`]; // Format as "value" and "name"
  };
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width='100%'>
        <Pie
          data={data}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={tooltipFormatter}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
