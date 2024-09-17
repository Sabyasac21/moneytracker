import React from "react";
import { Card } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import './card.css';
const App = (props) => (
  <Card
    style={{
      width: 'auto',
      height: "auto",
      backgroundColor: "rgba(227, 227, 222, 0.6)",
      boxShadow: "0 4px 18px rgba(0, 0, 0, 0.2)",
      marginRight:'1rem',
      marginBottom:'1rem'

    }}
  >
    <p className="card-content">{props.content}</p>
    <div
      className="user-avtar"
    >
      <Avatar size={54} style={{height:'58px', width:'58px'}} icon={<UserOutlined />} />
      <p className="user-details">{props.user}</p>
    </div>
  </Card>
);
export default App;
