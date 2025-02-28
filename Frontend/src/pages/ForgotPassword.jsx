// pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Simulate sending a password reset email
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }
    setMessage("A password reset link has been sent to your email.");
    setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Forgot Password</h2>
      <p className="text-center text-muted">
        Enter your email address to reset your password.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Reset Password
        </button>
        {message && <p className="mt-3 text-success">{message}</p>}
      </form>

      {/* Back to Login */}
      <p className="text-center mt-3">
        Remember your password? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default ForgotPassword;