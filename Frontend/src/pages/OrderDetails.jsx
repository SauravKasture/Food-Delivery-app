import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const OrderDetails = () => {
  const { orderId } = useParams(); // Get order ID from URL params
  const [order, setOrder] = useState(null); // State to store order details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch order details from the backend
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/api/orders/${orderId}`); // Fetch order details
        setOrder(response.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p className="text-center">Loading order details...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!order) return <p className="text-center text-muted">Order not found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Details</h2>

      {/* Order Summary */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title">Order #{order._id}</h5>
          <p className="card-text">
            <strong>Status:</strong> {order.status}
          </p>
          <p className="card-text">
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </p>
          <p className="card-text">
            <strong>Placed On:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
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
                <td>{item.menuItem.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.menuItem.price}</td>
                <td>₹{item.menuItem.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="d-flex justify-content-end fw-bold">
        <span>Total: ₹{order.totalAmount}</span>
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