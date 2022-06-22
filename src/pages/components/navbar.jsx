import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const NavbarItem = ({ title, props, link }) => {
  return (
    <li className="mr-4 cursor-pointer my-2 text-lg">
      <Link to={link}>{title}</Link>
    </li>
  );
};

const Navbar = () => {
  const { Header, Content, Footer, Sider } = Layout;
  return (
    <Header style={{ background: "grey" }}>
      <div>
        <nav className="w-full flex justify-between items-center p-2 bg-gray ">
          <div className="flex-initial justify-center items-center text-lg font-bold">
            Electron Ecosystem
          </div>

          <ul className="list-none flex flex-row justify-between items-center flex-initial">
            <li className="mr-4 cursor-pointer my-2 text-lg">
              <Link to="/">Home</Link>
            </li>
            {["Register", "Login"].map((item, index) => (
              <NavbarItem
                key={index}
                title={item}
                link={`/${item.toLowerCase()}`}
              />
            ))}
            <li className="mr-4 cursor-pointer my-2 text-lg">
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Header>
  );
};

export default Navbar;
