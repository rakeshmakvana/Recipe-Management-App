import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Popover, Button, Drawer } from "antd";
import { useCookies } from "react-cookie";
import {
  MenuFoldOutlined,
  CloseOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import logo from "../../src/assets/logo.png";
import "../styles/navbar.css";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth/login");
  };

  const { currentUser } = useSelector((state) => state.user);
  const userName = currentUser?.data?.data?.user?.username || "Guest";
  const userEmail = currentUser?.data?.data?.user?.email || "No email";

  const menuItems = (
    <div className="dropdownMenu">
      <Link to="/profile" className="dropdownItem">
        <ProfileOutlined /> Profile
      </Link>
      <Button onClick={logout} icon={<LogoutOutlined />} className="dropdownItem">
        Logout
      </Button>
    </div>
  );

  const profilePopover = (
    <div>
      <p className="pr-p">{userEmail}</p>
      <Button onClick={logout} className="btn-black">
        Logout
      </Button>
    </div>
  );

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <div className="logoContainer">
          <img src={logo} alt="logo" className="logo" />
        </div>

        <div className="hamburgerIcon" onClick={toggleDrawer}>
          {showDrawer ? <CloseOutlined /> : <MenuFoldOutlined />}
        </div>

        <div className="navLinks">
          <Link to="/" className="navLink">
            Home
          </Link>
          <Link to="/my-recipes" className="navLink">
            My Recipes
          </Link>
          <Link to="/create-recipe" className="navLink">
            Create Recipe
          </Link>
        </div>

        <div className="userProfile">
          <Popover content={profilePopover} title={userName}>
            <span className="profileName">
              <UserOutlined /> {userName}
            </span>
          </Popover>
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        visible={showDrawer}
        className="mobileDrawer"
      >
        <Link to="/" className="drawerLink" onClick={toggleDrawer}>
          Home
        </Link>
        <Link to="/create-recipe" className="drawerLink" onClick={toggleDrawer}>
          Create Recipes
        </Link>
        <Link to="/my-recipes" className="drawerLink" onClick={toggleDrawer}>
          My Recipes
        </Link>
      </Drawer>
    </nav>
  );
};

export default Navbar;
