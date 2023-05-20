import React, { useState, useContext } from "react";
import { Button, Form, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import { UserContext } from "../../context/auth";

const Navbar = () => {
  const {
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    adminLoggedIn,
    setAdminLoggedIn,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    alert("Logged Out Successfully");
    navigate("/");
    setUser(null);
    setLoggedIn(false);
    setAdminLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    // refresh page after submit is done
    window.location.reload();
  };
  const [navShow, setNavShow] = useState(false);
  return (
    <>
      <header className="container header">
        {/* ==== NAVBAR ==== */}
        <nav className="nav">
          <div className="logo" data-aos="fade-down" data-aos-duration="100">
            {/* <a href="/" style={{ textDecoration: "none" }}> */}
              <h2> छात्रवृत्ति </h2>
            {/* </a> */}
          </div>
          <div className="nav_menu" id="nav_menu">
            <button className="close_btn" id="close_btn">
              <i className="ri-close-fill" />
            </button>
            <ul className="nav_menu_list">
              {!adminLoggedIn ? (
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="200"
                >
                  <a
                    href="/"
                    className="nav_menu_link"
                    style={{ textDecoration: "none" }}
                  >
                    Home
                  </a>
                </li>
              ) : (
                <></>
              )}

              {!adminLoggedIn ? (
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="400"
                >
                  <a
                    href="/scholarships"
                    className="nav_menu_link"
                    style={{ textDecoration: "none" }}
                  >
                    Scholarships
                  </a>
                </li>
              ) : (
                <></>
              )}
              {!adminLoggedIn ? (
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="600"
                >
                  <a
                    href="/scholarship_information"
                    className="nav_menu_link"
                    style={{ textDecoration: "none" }}
                  >
                    Information
                  </a>
                </li>
              ) : (
                <></>
              )}
              {!adminLoggedIn ? (
                <li
                  className="nav_menu_item"
                  data-aos="fade-down"
                  data-aos-duration="800"
                >
                  <a
                    href="/contact"
                    className="nav_menu_link"
                    style={{ textDecoration: "none" }}
                  >
                    Contact Us
                  </a>
                </li>
              ) : (
                <></>
              )}

              {loggedIn ? (
                <li
                className="nav_menu_item"
                data-aos="fade-down"
                data-aos-duration="800"
              >
                <a
                  href="/user-dashboard"
                  className="nav_menu_link"
                  style={{ textDecoration: "none" }}
                >
                  Profile
                </a>
              </li>
              ) : (<></>)}

              <li
                className="nav_menu_item"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                {!loggedIn && !adminLoggedIn ? (
                  <button className="btn btn-primary-outline">
                    <NavDropdown title="Login" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/login">
                        <i className="ri-account-circle-line"/>
                        <span>  Student</span></NavDropdown.Item>
                      <NavDropdown.Item href="/admin_login">
                        <i className="ri-admin-fill"/>
                        <span>  Admin</span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </li>
            </ul>
          </div>
          <button
            className="toggle_btn"
            id="toggle_btn"
            onClick={() => setNavShow(true)}
          >
            <i className="ri-menu-line" />
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
