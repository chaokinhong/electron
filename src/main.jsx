import React from "react";
import ReactDOM from "react-dom";
import Routers from "./Router";
import { HashRouter as Router } from "react-router-dom";
import { ContractProvider } from "./context/ContractContext";
import "./index.css";

ReactDOM.render(
  <Router>
    <ContractProvider>
      <React.StrictMode>
        <Routers />
      </React.StrictMode>
    </ContractProvider>
  </Router>,
  document.getElementById("root")
);
