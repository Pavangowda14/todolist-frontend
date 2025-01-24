import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "../components/Sidebar";
import { fetchProjects } from "../slice/projectSlice";
import { useDispatch } from "react-redux";

const { Sider, Content, Header } = Layout;

const LayoutDesign = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch=useDispatch()

    useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <Layout className="min-h-[100vh] bg-white">
      <Sider
        width={260}
        theme="light"
        className="text-black bg-[#fefbf3]"
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
      >
        <Sidebar />
      </Sider>
      <Layout className="bg-white">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed((collapsed) => !collapsed)}
          className={`text-lg w-[64px] h-[64px] ${
            collapsed ? "left-0" : "left-[-50px]"
          }`}
        />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDesign;
