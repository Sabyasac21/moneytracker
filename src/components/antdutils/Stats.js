import React from "react";
import { ArrowUpOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
const StatisticCard = ({ category }) => {
    console.log(category)
  return <Row gutter={16}>
    {category.map((each, ind) => (
        <div style={{marginRight:'12px', marginBottom:'36px', width:'300px'}}>
      <Col span={24} key={ind}>
        <Card bordered={false} style={{backgroundColor:'white', }}>
          <Statistic
            title={<h3 style={{color:'darkgreen', fontSize:'30px', fontWeight:500}}>{each.type.slice(0, 1).toUpperCase()+each.type.slice(1)}</h3>}
            value={each.value}
            precision={2}
            valueStyle={{
              color: "purple",
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      </div>
    ))}
  </Row>
};
export default StatisticCard;
