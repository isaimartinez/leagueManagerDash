import React from "react";
import { useLogin } from "@refinedev/core";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

export const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const { mutate: login, isLoading } = useLogin();

  const onFinish = (values: any) => {
    login(values);
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 300 }}>
        <Title level={3}>Login</Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};