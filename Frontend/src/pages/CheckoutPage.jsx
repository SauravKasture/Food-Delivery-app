// pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Simulated form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "cash",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate("/order-details"); // Redirect to order details page
  };

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
            required
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
            <span>₹720.00</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Tax (10%):</span>
            <span>₹72.00</span>
          </div>
          <div className="d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>₹792.00</span>
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