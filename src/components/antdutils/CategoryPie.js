import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["purple", "lightgrey"];

const CategoryPie = (props) => {
  let data = [props.value];
  const rem = 100 - data[0].value;
  data = [...data, { type: "others", value: rem }];
  console.log(data, "from cat_data");
  const tooltipFormatter = (value, name, props) => {
    return [`${Math.round(value)}%`, `${props.payload.type}`]; // Format as "value" and "name"
  };
  return (
    <ResponsiveContainer width={250} height={200}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          data={data}
          cx="32%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          // paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
          ))}
          
        </Pie>
        <div>hii</div>
        <Tooltip formatter={tooltipFormatter} />
        
      </PieChart>
      
    </ResponsiveContainer>
  );
};

export default CategoryPie;
