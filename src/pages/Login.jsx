import React, { useState } from "react";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin ,handleSingup} = useUserContext();
  const [isLogin,setIsLogin]=useState(true)

  const onFinish = async(values) => {
    isLogin?await handleLogin(values):await handleSingup(values)
    navigate("/")
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Flex vertical justify="center" align="center" className="mt-5" gap="30px">
      <h1 className="font-bold text-2xl">{isLogin?"Login":"Sign up"}</h1>
      <div className="border-2 p-8 rounded-lg">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 900,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
         {!isLogin && <Form.Item
            label="Fist Name"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>} 
          {!isLogin && <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <p className="mt-5">
          {isLogin?"Don't have an account?":"Already have an Account?"}
          <Button type="link" onClick={()=>{setIsLogin(!isLogin)}} className="p-0">
            {isLogin?"Sign up":"Login"}
          </Button>
        </p>
      </div>
    </Flex>
  );
};
export default Login;
