import React from "react";
import { GeneratorPage } from "./pages";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./antd.css";

const App = () => {
  const { Header, Content, Footer } = Layout;
  return (
    <div className="min-h-screen">
      <GeneratorPage/>
    </div>
  );
};

export default App;
