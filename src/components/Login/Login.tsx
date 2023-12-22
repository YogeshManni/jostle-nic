import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { LogoComponent } from "../../App";
import { Link } from "react-router-dom";

export default function Login(props: any) {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="flex flex-col lg:w-[50%] h-full p-10 justify-center  w-[100vw]">
      <div className="shadow-2xl shadow-[#8b5cf6]/60 p-10 rounded-[15px] w-full">
        <LogoComponent />
        <Form
          name="normal_login"
          className="login-form mt-10 xl:px-20"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item className="flex items-center justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-button w-[100px]"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>

          <Form.Item className="flex items-center justify-center  lg:hidden">
            <p>
              Don't have an account?
              <Link to="/register" className="text-sbutton">
                {" "}
                <span
                  onClick={() => {
                    props.changeType("signUp");
                  }}
                >
                  Sign up Now !
                </span>
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
