import React from "react";
import "./Navbar.css";
import nxcarLogo from "../../assets/nxcarLogo.svg";

const Navbar = ({ openLoginForm, setOpenLoginForm }) => {
  const navbarElements = [
    {
      element: "About Us",
      route: "/about-us",
    },
    {
      element: "Services",
      route: "/services",
    },
    {
      element: "Contact Us",
      route: "/contact-us",
    },
    {
      element: "FAQs",
      route: "/faqs",
    },
    {
      element: "Blogs",
      route: "/blogs",
    },
  ];

  return (
    <>
      <div className="navbar-container">
        <div className="logo">
          <img src={nxcarLogo} alt="" />
        </div>
        <div className="navbar-items">
          {navbarElements?.map((navItem, index) => (
            <div className="nav-links">
              <a href="">{navItem?.element}</a>
            </div>
          ))}
          <button
            className="login-button"
            onClick={() => setOpenLoginForm(!openLoginForm)}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
