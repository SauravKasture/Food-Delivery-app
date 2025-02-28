// components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ userRole, userName, handleLogout, cartItemCount }) => {
  const navigate = useNavigate(); // Use navigate hook here

  // Handle logout with redirection
  const handleUserLogout = () => {
    handleLogout(); // Call the parent handleLogout function
    navigate("/"); // Redirect to Home page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand text-danger fw-bold">
          🍕 Foodie
        </Link>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {/* Common Links */}
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>

            {/* Conditional Links Based on User Role */}
            {userRole === "guest" && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}

            {(userRole === "user" || userRole === "admin") && (
              <>
                <li className="nav-item">
                  <Link to="/menu" className="nav-link">
                    Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">
                    Orders
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link to="/cart" className="nav-link d-flex align-items-center">
                    <i className="fas fa-cart-shopping me-1"></i> Cart{" "}
                    {cartItemCount > 0 && (
                      <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userName}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li>
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleUserLogout} // Use the new logout handler
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {userRole === "admin" && (
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;