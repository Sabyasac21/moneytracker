import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Modal from "../antdutils/Modal";
import CustomPieChart from "../antdutils/PieChart";
import chroma from 'chroma-js'
import {
  WalletOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Statistic, theme } from "antd";
import ColumnChart from "./Charts/ColumnCharts";
import { useDispatch, useSelector } from "react-redux";
import { setShowExpenseForm, setShowModal } from "../../Redux/Slice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StatisticCard from "../antdutils/Stats";
import Status from "./Status";

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [expense, setExpense] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totExpense, setTotExpense] = useState("");
  const [dateSpan, setDateSpan] = useState([]);
  const [monday, setMonday] = useState(new Date());
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.handleApp.authorized);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { userId } = useParams();
  const location = useLocation();
  const type = location.pathname.includes("/dashboard/income")
    ? "Income"
    : location.pathname.includes("/dashboard/status")
    ? "Status"
    : "Expense";
  console.log(isAuth, 'from  dashboard....');
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/dashboard/weekly-expenses/${userId}?type=${type}&date=${monday}`,
        {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("auth-token")}`
        }
      }
      );
      console.log(response, 'chcecking');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setExpense(data.expenses);
      setCategoryData(data.category);
      setTotExpense(data.totExpense);
      setDateSpan(data.dateSpan);
      data.totExpense ? setIsEmpty(false) : setIsEmpty(true);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  console.log(totExpense, categoryData);

  const handleExpenseEdit = () => {
    dispatch(setShowExpenseForm(true));
  };
  const handlePrev = () => {
    const chDate = new Date(monday);
    chDate.setDate(monday.getDate() - 7);
    setMonday(chDate);
  };
  const handleNext = () => {
    const chDate = new Date(monday);
    chDate.setDate(monday.getDate() + 7);
    setMonday(chDate);
  };

  const handleDeleteExpenses = ()=>{
    dispatch(setShowModal(true))
    navigate(`/dashboard/${type}/${userId}/delete`)
  }
  const generateColors = (numColors) => {
    return chroma.scale(['#f00', '#0f0', '#00f']).mode('lch').colors(numColors);
  };
  const colors = generateColors(categoryData.length)

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [type, monday]);

  return (
    <Layout>
      <Content className="dashboard-content">
        <Layout
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            className="dashboard-sider"
            // collapsible
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
                  icon: (
                    <DollarCircleOutlined
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    />
                  ),
                  label: (
                    <Link to={`/dashboard/income/${userId}`}>
                      <p style={{ fontSize: "28px" }}>Income</p>
                    </Link>
                  ),
                },
                {
                  key: "2",
                  icon: (
                    <WalletOutlined
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    />
                  ),
                  label: (
                    <Link to={`/dashboard/expense/${userId}`}>
                      <p style={{ fontSize: "28px" }}>Expense</p>
                    </Link>
                  ),
                },
                {
                  key: "3",
                  icon: (
                    <UserOutlined
                      style={{ fontSize: "20px", fontWeight: 600 }}
                    />
                  ),
                  label: (
                    <Link to={`/dashboard/status/${userId}`}>
                      <p style={{ fontSize: "28px" }}>Status</p>
                    </Link>
                  ),
                },
              ]}
            />
          </Sider>
          <Content className="dashboard-inner-content">
            <div className="charts-dash">
              <div style={{position:'relative'}}>
              {type!='Status'&&<h1 style={{ textAlign: "center", padding: "12px 0" }}>
                Weekly {type === "Income" ? "income" : "expense"} from:{" "}
                <span style={{color:'purple'}}>{dateSpan[0]} - {dateSpan[1]}</span>
              </h1>}
              <Button onClick={handleDeleteExpenses} style={{position:'absolute', top:23, right:20}}>Delete</Button>
              </div>

              <div className="chart-stats">
                {type != "Status" &&  (
                  <div className="col-chart">
                    <ColumnChart value={expense} />
                    <div style={{padding:'20px 0' }}>
                      <Button
                        onClick={handlePrev}
                        style={{ marginRight: "5px" }}
                      >
                        Prev
                      </Button>
                      <Button onClick={handleNext}>Next</Button>
                    </div>
                  </div>
                )}

                {type != "Status" && !isEmpty && (
                  <div className="pie-chart">
                    <div className="category-brief">
                      <h3 style={{ paddingLeft: "10px", fontSize: "20px" }}>
                        {`${type === "Income" ? "Tot Income" : "Tot Expense"}:`}
                        <span style={{ color: "purple" }}>${totExpense}</span>
                      </h3>
                      <h1 style={{ padding: "0 10px", color: "purple" }}>
                        Category
                      </h1>

                      <div className="category-brief-cont">
                        {categoryData.map((category, index) => (
                          <div className="cat-brief-brief">
                            <span className="cat-brief-brief-col" style={{backgroundColor:colors[index % colors.length], marginRight:'8px'}}></span>
                            <h3>
                              {category.type.slice(0, 1).toUpperCase() +
                                category.type.slice(1)}
                            </h3>
                            <p style={{ fontSize: "18px", fontWeight: 300 }}>
                              {Math.round(category.value)}%
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <CustomPieChart value={categoryData} />
                  </div>
                )}
                {type === "Status" && (
                  // <div>
                  <Status />
                  // </div>
                )}
              </div>
              {categoryData && type != "Status" && (
                <div className="stats-cont">
                  <h1 style={{ textAlign: "center", color: "darkpurple" }}>
                    Weekly category
                  </h1>
                 
                  <StatisticCard category={categoryData} totalExp = {totExpense}/>
                </div>
              )}
            </div>
            {type!="Status" && <div className="edit-btn">
              <Button
                type="primary"
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  marginTop: "25px",
                  height: "100px",
                  width: "100px",
                  padding: "12px",
                  borderRadius: "100%",
                  boxShadow: " 0px 4px 8px rgba(0, 0, 0, 0.5)",
                }}
                onClick={handleExpenseEdit}
              >
                {type === "Expense" ? (
                  <p>
                    Edit
                    <br />
                    Expense
                  </p>
                ) : (
                  <p>
                    Edit
                    <br />
                    Income
                  </p>
                )}
              </Button>
            </div>}
            <Modal refreshData={fetchData} />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default App;
