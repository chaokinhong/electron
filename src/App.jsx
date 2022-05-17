import React from "react";
import MainPage from "./pages/pages/mainPage";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./antd.css";

const App = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <div className="min-h-screen">
      <MainPage/>
    </div>
  );
};

export default App;
