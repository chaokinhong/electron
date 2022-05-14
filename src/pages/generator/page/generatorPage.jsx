import React from "react";
import { Layout, Menu } from "antd";
import RegisterForm from "../component/registerForm";


const GeneratorPage = () => {

  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ background: "grey" }}>header</Header>
      <Layout>
        <Sider style={{ background: "grey" }}>
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Register</Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <RegisterForm />
        </Content>
      </Layout>
    </Layout>
  );
};

export default GeneratorPage;
