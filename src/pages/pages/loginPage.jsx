import React from "react";
import LoginForm from "../components/loginForm";
import Navbar from "../components/navbar";

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className="m-auto w-2/5 ">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
