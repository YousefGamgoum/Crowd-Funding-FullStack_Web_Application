import { Link } from "react-router";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("logged");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("userId");
    localStorage.removeItem("user_email");
    setIsLoggedIn(false);
  };

  return (
    <div id="containernav" className=" sticky-top ">
      <nav
        className="navbar bg-dark border-bottom border-body navbar-expand-lg container"
        id="navStyle"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <span className="navbar-brand">Crowd Fund</span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {isLoggedIn && (
                <>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/create"
                  >
                    Create Project
                  </NavLink>
                </>
              )}
            </div>

            {/* Right-aligned navigation items */}
            <div className="navbar-nav ms-auto">
              {!isLoggedIn ? (
                <>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/register"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <>
                  <span className="nav-link disabled text-light lead">
                    Welcome!
                  </span>
                  <Link
                    className="nav-link text-danger"
                    onClick={handleLogout}
                    to="/"
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
