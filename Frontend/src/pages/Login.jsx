import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Import the Axios instance

const Login = ({ setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend using Axios
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const data = response.data;

      // Simulate successful login
      console.log("Logged in with:", data);
      setUserRole(data.user.role, data.user.name);
      localStorage.setItem("token", data.token); // Store JWT token in localStorage
      setToastMessage("Login successful!");
      setShowToast(true);
      sessionStorage.setItem("welcomeMessageShown", "false");

      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/"); // Redirect to Home page for regular users
        }
      }, 1500); // Delay redirection to show toast
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-danger">
      {/* Card with Rounded Corners and Shadow */}
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "15px", // Rounded corners
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 className="text-warning fw-bold">Welcome Back!</h2>
          <p className="text-secondary small">
            Log in to manage your orders and enjoy delicious meals.
          </p>
        </div>
        {/* Error Message */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
              aria-label="Close"
            ></button>
          </div>
        )}
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-muted small">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-muted small">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control form-control-lg rounded-pill"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Forgot Password Link */}
          <div className="text-end mb-3">
            <a
              href="#"
              className="text-warning text-decoration-none small"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            >
              Forgot Password?
            </a>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-danger btn-lg w-100 rounded-pill mt-3"
          >
            Login
          </button>
          {/* Register Link */}
          <div className="text-center mt-3">
            <a href="/register" className="text-warning text-decoration-none small">
              Don't have an account? Create one here.
            </a>
          </div>
        </form>
      </div>
      {/* Toast Notification */}
      <div
        className={`toast position-fixed bottom-0 end-0 m-3 ${showToast ? "show" : ""}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ zIndex: 9999 }}
      >
        <div className="toast-header bg-success text-white">
          <strong className="me-auto">Success</strong>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={() => setShowToast(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{toastMessage}</div>
      </div>
      {/* Modal for Forgot Password */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-warning">Forgot Password?</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-muted">
                Enter your email address below, and we'll send you a link to reset your
                password.
              </p>
              <input
                type="email"
                className="form-control form-control-lg rounded-pill"
                placeholder="Enter your email"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button type="button" className="btn btn-danger rounded-pill">
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Overlay for Modal */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </div>
  );
};

export default Login;