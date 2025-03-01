import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext); // Access cart context

  // Debugging: Log cartItems
  console.log("Cart Items:", cartItems);

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "cash",
  });

  // State for loading user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/api/user/details"); // Fetch user details
        const { name, address } = response.data;

        // Pre-fill form fields with user details
        setFormData((prevData) => ({
          ...prevData,
          name,
          address: address || "", // Use empty string if address is null
        }));
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Starting checkout process..."); // Debug log
      console.log("Cart items:", cartItems); // Debug log

      if (!Array.isArray(cartItems) || cartItems.length === 0) {
        console.error("Cart is empty or invalid:", cartItems); // Debug log
        alert("Your cart is empty. Please add items to proceed.");
        return;
      }

      // Calculate total amount from cart items
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.menuItem.price * item.quantity,
        0
      );
      console.log("Calculated total amount:", totalAmount); // Debug log

      // Prepare order data
      const orderData = {
        items: cartItems.map((item) => ({
          menuItem: item.menuItem._id, // Updated to use menuItem instead of product
          quantity: item.quantity,
        })),
        totalAmount,
        deliveryAddress: formData.address, // Include delivery address
      };
      console.log("Order data to be sent:", orderData); // Debug log

      // Validate delivery address
      if (!formData.address.trim()) {
        alert("Please provide a valid delivery address.");
        return;
      }

      // Send order to backend using Axios
      try {
        const response = await axiosInstance.post("/api/orders", orderData);
        console.log("Backend response:", response.data); // Debug log
      } catch (orderErr) {
        console.error("Error placing order:", orderErr);
        throw new Error(orderErr.response?.data?.message || "Failed to place order.");
      }

      // Clear the cart
      clearCart(); // Clear cart globally via CartContext
      alert("Order placed successfully!");
      navigate("/order-history"); // Redirect to Order History Page
    } catch (err) {
      console.error("Unexpected error during checkout:", err); // Debug log
      alert(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Checkout 🚚</h2>
      {/* Checkout Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            readOnly // Prevent editing of name
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Delivery Address
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="paymentMethod" className="form-label">
            Payment Method
          </label>
          <select
            className="form-select"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="cash">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
            <option value="wallet">Wallet</option>
          </select>
        </div>
        {/* Order Summary */}
        <div className="mt-4">
          <h4>Order Summary</h4>
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>
              ₹
              {cartItems
                .reduce((total, item) => total + item.menuItem.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Tax (10%):</span>
            <span>
              ₹
              {(
                cartItems.reduce((total, item) => total + item.menuItem.price * item.quantity, 0) *
                0.1
              ).toFixed(2)}
            </span>
          </div>
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>
              ₹
              {(
                cartItems.reduce((total, item) => total + item.menuItem.price * item.quantity, 0) *
                1.1
              ).toFixed(2)}
            </span>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100 mt-3">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;