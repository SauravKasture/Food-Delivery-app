import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Panel</h1>
      <div className="admin-sections">
        <div className="card">Total Orders: 120</div>
        <div className="card">Revenue: ₹50,000</div>
        <div className="card">Active Users: 300</div>
        <div className="card">Restaurants: 25</div>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;
