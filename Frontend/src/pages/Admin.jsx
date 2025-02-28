// pages/Admin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  // Simulated data for admin dashboard
  const [orders, setOrders] = useState([
    { id: 1, user: "John Doe", total: 450, status: "Pending" },
    { id: 2, user: "Jane Smith", total: 600, status: "Delivered" },
    { id: 3, user: "Alice Johnson", total: 300, status: "Cancelled" },
  ]);

  const [restaurants, setRestaurants] = useState([
    { id: 1, name: "Spice Delight", location: "New York", rating: 4.5 },
    { id: 2, name: "Taco House", location: "Los Angeles", rating: 4.2 },
    { id: 3, name: "Sushi Palace", location: "San Francisco", rating: 4.7 },
  ]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Update order status
  const updateOrderStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="admin-dashboard container mt-4">
      {/* Header */}
      <h1 className="text-center mb-4">Admin Panel</h1>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text display-6">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <p className="card-text display-6">₹{orders.reduce((sum, order) => sum + order.total, 0)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <p className="card-text display-6">300</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Restaurants</h5>
              <p className="card-text display-6">{restaurants.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <h2 className="mb-3">Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user}</td>
                <td>₹{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Restaurants Section */}
      <h2 className="mt-5 mb-3">Restaurants</h2>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">
                  <strong>Location:</strong> {restaurant.location}
                </p>
                <p className="card-text">
                  <strong>Rating:</strong> {restaurant.rating}/5
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button className="btn btn-danger mt-4" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Admin;