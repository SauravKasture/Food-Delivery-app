import React from "react";

const Register = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?food,restaurant')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "400px", borderRadius: "10px", backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.8)" }}>
        <h2 className="text-center text-danger">Join the Feast! 🍔</h2>
        <p className="text-center text-muted">Register & Order Your Favorite Meals! 🍕</p>
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Create a password" />
          </div>
          <button className="btn btn-danger w-100">Sign Up</button>
          <p className="text-center mt-3">
            Already have an account? <a href="/login" className="text-danger">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;