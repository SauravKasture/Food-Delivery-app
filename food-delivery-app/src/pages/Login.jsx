import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 // Ensure Bootstrap is imported

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in with:", email, password);
    navigate("/admin"); // Redirect after login
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-gradient bg-danger">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-warning">Welcome Back!</h2>
        <p className="text-center text-secondary">Log in to manage your orders</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <a href="/register" className="text-warning">Create an Account</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
