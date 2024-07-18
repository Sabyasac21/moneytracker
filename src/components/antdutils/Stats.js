import React from "react";
import { ArrowUpOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import CategoryPie from "./CategoryPie";
import "./stats.css";
const StatisticCard = ({ category }) => {
  return (
    <div className="category-status">
      {category.length &&
        category.map((each, ind) => (
          <Card bordered={false} key={ind}  style={{ backgroundColor: "white", marginRight:'24px'}}>
            <div className="category-identifier"><div></div><h3>{each.type}</h3><p>:{Math.round(each.value)}% </p></div>
            <CategoryPie value={each} />
            
          </Card>
        ))}
    </div>
  );
};
export default StatisticCard;
