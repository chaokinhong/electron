import React from "react";
import Navbar from "../components/navbar";
import RegisterForm from "../components/registerForm";

const RegisterPage = () => {
  return (
    <div>
      <Navbar />
      <div className="m-auto w-2/5 ">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
