import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.mobile) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.mobile.length !== 10 || isNaN(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      // Send registration request to backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors (e.g., user already exists)
        setError(data.message || "Registration failed");
        return;
      }

      // Show success toast and redirect to login page
      setToastMessage("Registration successful! Redirecting to login...");
      setShowToast(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000); // Delay redirection to show toast
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?food,restaurant')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card with Blur Effect */}
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px", // Rounded corners
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Header Section */}
        <h2 className="text-center text-danger fw-bold">Join the Feast! 🍔</h2>
        <p className="text-center text-muted small">
          Register & Order Your Favorite Meals! 🍕
        </p>
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
        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          {/* Full Name Field */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label text-muted small">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control rounded-pill"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-muted small">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Mobile Number Field */}
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label text-muted small">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              className="form-control rounded-pill"
              placeholder="Enter your 10-digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
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
              name="password"
              className="form-control rounded-pill"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* Sign Up Button */}
          <button
            type="submit"
            className="btn btn-danger w-100 rounded-pill mt-3"
          >
            Sign Up
          </button>
          {/* Login Link */}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-danger text-decoration-none fw-bold">
              Login
            </a>
          </p>
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
    </div>
  );
};

export default Register;