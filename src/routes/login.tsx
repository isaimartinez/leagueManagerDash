import React from "react";
import { useLogin, useNavigation } from "@refinedev/core";
import { Button, Form, Input, Spin } from "antd";
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export const LoginPage: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();
  const { goBack } = useNavigation();

  const onFinish = (values: any) => {
    login(values);
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      padding: "20px"
    }}>
      <Form
        onFinish={onFinish}
        style={{ 
          width: "100%",
          maxWidth: "400px", 
          padding: "20px", 
          boxShadow: "0 0 10px rgba(0,0,0,0.1)", 
          borderRadius: "8px" 
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h1>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }} disabled={isLoading}>
            {isLoading ? <Spin size="small" /> : "Login"}
          </Button>
        </Form.Item>
      </Form>
      <Button 
        onClick={() => goBack()} 
        icon={<ArrowLeftOutlined />} 
        style={{ marginTop: "20px" }}
      >
        Go Back
      </Button>
    </div>
  );
};
