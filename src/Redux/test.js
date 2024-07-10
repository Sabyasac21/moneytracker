import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Modal from '../antdutils/Modal';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WalletOutlined,
  UserOutlined,
  DollarCircleOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Breadcrumb, theme } from "antd";
import ColumnChart from "./Charts/ColumnCharts";
import { useDispatch } from "react-redux";
import { setShowExpenseForm } from "../../Redux/Slice";
import { useParams } from "react-router-dom";
import CustomPieChart from "../antdutils/PieChart";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expense, setExpense] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { userId } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/dashboard/weekly-expenses/${userId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setExpense(data.expenses);
      setCategoryData(data.category);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleExpenseEdit = () => {
    dispatch(setShowExpenseForm(true));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" style={{ color: "grey" }}>Logo</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ flex: 1, minWidth: 0 }}
        >
          {["1", "2", "3"].map((key) => (
            <Menu.Item key={key}>nav {key}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ background: colorBgContainer }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={[
                {
                  key: "1",
                  icon: <DollarCircleOutlined />,
                  label: "Income",
                },
                {
                  key: "2",
                  icon: <WalletOutlined />,
                  label: "Expenses",
                },
                {
                  key: "3",
                  icon: <UserOutlined />,
                  label: "Status",
                },
                {
                  key: "4",
                  icon: <LaptopOutlined />,
                  label: "Subnav",
                  children: [
                    { key: "4.1", label: "Option 1" },
                    { key: "4.2", label: "Option 2" },
                  ],
                },
                {
                  key: "5",
                  icon: <NotificationOutlined />,
                  label: "Notifications",
                  children: [
                    { key: "5.1", label: "Option 1" },
                    { key: "5.2", label: "Option 2" },
                  ],
                },
              ]}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div className="charts-stats-cont">
              <div className="charts">
                <h1 style={{ textAlign: "center" }}>Daily Expenses</h1>
                <div className="chart-stats">
                  {expense.length ? (
                    <ColumnChart value={expense} />
                  ) : (
                    <h3>No expenses to show. Add your expenses.</h3>
                  )}
                  <CustomPieChart value={categoryData} />
                </div>
                <h2>You have spent $50 less than yesterday</h2>
              </div>
              <div>
                <Button type="primary" style={{ fontSize: "18px" }} onClick={handleExpenseEdit}>
                  Edit Expense
                </Button>
              </div>
            </div>
            <Modal refreshData={fetchData} />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <p style={{ fontSize: "18px" }}>
          © {new Date().getFullYear()} Finance Tracker App. All rights reserved.
        </p>
      </Footer>
    </Layout>
  );
};

export default App;
