// pages/TrackOrder.jsx
import React, { useState } from "react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  // Simulate fetching order status
  const handleTrackOrder = () => {
    if (!orderId) {
      alert("Please enter a valid order ID.");
      return;
    }

    // Simulated order data
    const orders = [
      { id: "12345", status: "Pending", deliveryTime: "2023-10-15T14:30:00Z" },
      { id: "67890", status: "Delivered", deliveryTime: "2023-10-14T10:00:00Z" },
    ];

    const order = orders.find((o) => o.id === orderId);
    if (order) {
      setOrderStatus(order);
    } else {
      alert("Order not found. Please check your order ID.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Track Your Order</h2>
      <p className="text-center text-muted">
        Enter your order ID to check the status of your delivery.
      </p>

      {/* Order Tracking Form */}
      <div className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="orderId" className="form-label">
            Order ID
          </label>
          <input
            type="text"
            className="form-control"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            required
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleTrackOrder}
        >
          Track Order
        </button>
      </div>

      {/* Order Status */}
      {orderStatus && (
        <div className="card shadow-sm mt-4">
          <div className="card-body">
            <h5 className="card-title">Order #{orderStatus.id}</h5>
            <p className="card-text">
              <strong>Status:</strong> {orderStatus.status}
            </p>
            <p className="card-text">
              <strong>Estimated Delivery Time:</strong>{" "}
              {new Date(orderStatus.deliveryTime).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;