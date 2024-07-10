import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthorized, setShowModal } from "../../Redux/Slice";
import { useDispatch } from "react-redux";
import './signup.css'

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = useLocation();
  const path = pathname.pathname;
  const onFinish = async (values) => {
    if (path === "/register") {
      try {
        const { username, [" email"]: email, password } = values;
        const response = await fetch("https://dailyexpense-backend.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();

        if (!data.success) {
          console.error(
            "Failed to register:",
            response.status,
            response.statusText
          );
          return;
        }
        localStorage.setItem("auth-token", data.token);
        console.log("Registration successful:", data);
        dispatch(setShowModal(false));
        navigate(`/dashboard/income/${data.userId}`);
      } catch (error) {
        console.error("Error registering user:", error.message);
      }
    } else {
      try {
        const { [" email"]: email, password } = values;
        const response = await fetch("https://dailyexpense-backend.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!data.success){
          console.error("failed to register",response.status, response, response.statusText);
          return;
        }
        localStorage.setItem('auth-token', data.token);
        console.log("Registration successful", data);
        dispatch(setShowModal(false));
        navigate(`/dashboard/income/${data.userId}`)
      } catch (error) {console.log('error occured', error);}
    }
    dispatch(setAuthorized(true))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      theme="dark"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 106,
      }}
      style={{
        width: 'auto',
        height: "400px",
        backgroundColor: "#F7EBE8",
        borderRadius: "10px",
        padding: "10px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {path === "/register" && (
        <Form.Item
          label={<span style={{ fontSize: "24px" }}>Username</span>}
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input style={{ height: "50px", fontSize: "24px" }} />
        </Form.Item>
      )}

      <Form.Item
        label={<span style={{ fontSize: "24px" }}>Email</span>}
        name=" email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input style={{ height: "50px", fontSize: "24px" }} />
      </Form.Item>

      <Form.Item
        label={<span style={{ fontSize: "24px" }}>Password</span>}
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password style={{ height: "50px", fontSize: "24px" }} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{ padding: "20px 40px", fontSize: "18px", fontWeight: "500" }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
