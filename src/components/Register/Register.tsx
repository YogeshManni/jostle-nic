import React from "react";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { LogoComponent } from "../../App";
import { Link } from "react-router-dom";

export default function Register(props: any) {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  return (
    <div className="flex flex-col lg:w-[50%] h-full p-10 justify-center  lg:ml-[50%] w-[100vw]">
      <div className="shadow-2xl shadow-[#8b5cf6]/60 p-10 rounded-[15px]">
        <LogoComponent />
        <Form
          name="normal_login"
          className="login-form mt-10 xl:pr-20"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          {...formItemLayout}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            hasFeedback
          >
            <Input
              size="large"
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm password"
            />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number" hasFeedback>
            <Input
              size="large"
              style={{ width: "100%" }}
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="Phone Number"
              type="number"
            />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              className="bg-button w-[100px]"
              size="large"
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
          <Form.Item className="flex items-center justify-center  lg:hidden">
            <p>
              Already have an account?
              <Link to="/" className="text-sbutton">
                {" "}
                <span
                  onClick={() => {
                    props.changeType("signIn");
                  }}
                >
                  Sign In Now !
                </span>
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
