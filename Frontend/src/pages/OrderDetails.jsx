// pages/OrderDetails.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  // Simulated order data (replace with API call later)
  const orders = [
    {
      id: 1,
      items: [
        { name: "Paneer Butter Masala", price: 250, quantity: 2 },
        { name: "Chicken Biryani", price: 350, quantity: 1 },
      ],
      total: 850,
      status: "Delivered",
      deliveryAddress: "123 Main Street, New York, NY",
      deliveryTime: "2023-10-15T14:30:00Z",
    },
    {
      id: 2,
      items: [
        { name: "Cold Coffee", price: 120, quantity: 3 },
        { name: "Gulab Jamun", price: 80, quantity: 5 },
      ],
      total: 760,
      status: "Pending",
      deliveryAddress: "456 Elm Street, Los Angeles, CA",
      deliveryTime: "2023-10-16T10:00:00Z",
    },
  ];

  // Get order ID from URL params
  const { orderId } = useParams();
  const order = orders.find((o) => o.id === parseInt(orderId));

  if (!order) {
    return <p className="text-center text-muted">Order not found.</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Details</h2>

      {/* Order Summary */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Order #{order.id}</h5>
          <p className="card-text">
            <strong>Status:</strong> {order.status}
          </p>
          <p className="card-text">
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </p>
          <p className="card-text">
            <strong>Estimated Delivery Time:</strong>{" "}
            {new Date(order.deliveryTime).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Items List */}
      <h4>Items Ordered</h4>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="d-flex justify-content-end fw-bold">
        <span>Total: ₹{order.total}</span>
      </div>

      {/* Track Order Button */}
      <div className="mt-3">
        <Link to="/track-order" className="btn btn-primary">
          Track Order
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;