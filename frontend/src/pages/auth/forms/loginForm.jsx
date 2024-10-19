import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import { logInStart, logInSuccess, logInFailure } from "../../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/Spinner.jsx";
import API_BASE_URL from "../../../api.js";
import "../../../styles/register.css";

const LoginForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [_, setCookies] = useCookies(["access_token"]);

  const onFinish = async (values) => {
    try {
      dispatch(logInStart());
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/users/login`,
        {
          username: values.username,
          password: values.password,
        }
      );

      dispatch(logInSuccess(response));
      message.success("Login successful");
      setCookies("access_token", response.data.data.access_token);
      navigate("/");
    } catch (err) {
      message.error("Login failed. Please check your credentials.");
      console.error(err);
      dispatch(logInFailure(err));
    }
  };

  return (
    <div className="loginFormContainer">
      <h2 className="formTitle">Login to Your Account</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Username" className="formInput" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Password" className="formInput" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submitButton">
            {loading ? <Spinner /> : "Login"}
          </Button>
          <div className="registerLink">
            <Link to="/auth/register">Don't have an account? Register</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
