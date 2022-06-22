import { Route, Routes } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/pages/loginPage";
import RegisterPage from "./pages/pages/registerPage";
import ProfilePage from "./pages/pages/profilePage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default Routers;
