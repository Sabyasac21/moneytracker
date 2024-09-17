import React from "react";
import { Card } from "antd";
import CategoryPie from "./CategoryPie";
import "./stats.css";
import ProgressBar from "./ProgressBar";
const StatisticCard = ({ category, totalExp }) => {
  console.log(totalExp, 'this is the totExp');
 
  return (
    <div className="category-status">
      {category.length &&
        category.map((each, ind) => (
          <Card bordered={false} key={ind}  style={{ backgroundColor: "white", marginRight:'24px'}}>
            <div className="category-identifier"><div></div><h3>{each.type}</h3><p>:${Math.round((each.value/100)*totalExp)} </p></div>
            <CategoryPie value={each} />
            <ProgressBar data={each}/>
            
          </Card>
        ))}
    </div>
  );
};
export default StatisticCard;
