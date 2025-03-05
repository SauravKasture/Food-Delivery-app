import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/orders"); // Fetch all orders for the user
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Loading orders...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (orders.length === 0)
    return <p className="text-center text-muted">No orders found.</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Orders</h2>

      {/* List of Orders */}
      <div className="list-group">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/order-details/${order._id}`}
            className="list-group-item list-group-item-action"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>Order #{order._id}</h5>
                <p className="mb-0">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="mb-0">
                  <strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}
                </p>
              </div>
              <small className="text-muted">
                {new Date(order.createdAt).toLocaleDateString()}
              </small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;