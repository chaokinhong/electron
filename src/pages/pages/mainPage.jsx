import React from "react";
import { Layout, Menu } from "antd";
import LockElectricityForm from "../components/lockElectricityForm";
import Navbar from "../components/navbar";

const MainPage = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const [currentPage, setCurrentPage] = React.useState();

  const handle = (e) => {
    setCurrentPage(e.key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <div>
        <Navbar />
      </div>
      <Layout>
        <Sider style={{ background: "grey" }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ background: "grey" }}
          >
            <Menu.Item key="1" onClick={handle}>
              Market
            </Menu.Item>
            <Menu.Item key="2" onClick={handle}>
              Buy
            </Menu.Item>
            <Menu.Item key="3" onClick={handle}>
              Exchange
            </Menu.Item>
            <Menu.Item key="4" onClick={handle}>
              Lock
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          {currentPage === "4" && (
            <div className="flex">
              <LockElectricityForm />{" "}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
