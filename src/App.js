import React, { useEffect }  from "react";
import logo from "./assets/app_logo.png";
import { Layout, Menu, theme } from "antd";
import IntroFile from "./components/intro/IntroFile";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  setAuthorized, setShowModal } from "./Redux/Slice";
const { Header, Content, Footer } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state=>state.handleApp.authorized)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleSignupClick = () => {
    dispatch(setShowModal(true));
  };
  const handleLoginClick = () => {
    dispatch(setShowModal(true));
  };
  const handleLogoutClick = () => {
    localStorage.removeItem("auth-token");
    dispatch(setAuthorized(false))
  };
  

  return (
    <Router>
      <Layout>
        <Header
        className="header-main"
          style={{
            position: "sticky",
            padding: "10px 20px",
            background:'#F4F2F8',
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "80px",
          }}
          
        >
          <Link to="/">
            <div
              className="demo-logo"
              style={{ display: "flex", justifyContent: "center", marginRight:'12px'}}
            >
              <img style={{ height: "70px" }} src={logo} alt="logo" />
            </div>
          </Link>

          <Menu
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              flex: 1,
              backgroundColor:'inherit',
              border:'none',
              fontSize: "24px",
              justifyContent: "flex-end",
            }}
          >
            {!localStorage.getItem('auth-token') && (
              <div >
                <Link
                  style={{ marginRight: "20px" }}
                  to="/login"
                  onClick={handleLoginClick}
                >
                  <Menu.Item className="menu-item">Login</Menu.Item>
                </Link>

                <Link to="/register">
                  <Menu.Item onClick={handleSignupClick} className="menu-item">SignUp</Menu.Item>
                </Link>
              </div>
            )}

            {localStorage.getItem('auth-token') && (
              <Link to="/">
                <Menu.Item onClick={handleLogoutClick}>Logout</Menu.Item>
              </Link>
            )}
          </Menu>
        </Header>
        <Content>
          <div className="content-container"
            style={{
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding:'10px 8px',
              overflow: 'hidden'
            }}
          >
            <Routes>
              <Route path="/" element={<IntroFile />} />
              <Route path="/register" element={<IntroFile />} />
              <Route path="/login" element={<IntroFile />} />
              <Route path="/dashboard/expense/:userId" element={<Dashboard />} />
              <Route path="/dashboard/income/:userId" element={<Dashboard />} />
              <Route path="/dashboard/status/:userId" element={<Dashboard/>} />
            </Routes>
           
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "18px" }}>
            © {new Date().getFullYear()} Finance Tracker App. All rights
            reserved.
          </p>
        </Footer>
      </Layout>
    </Router>
  );
};
export default App;
