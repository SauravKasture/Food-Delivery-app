import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, addToCartHandler, removeFromCartHandler } = useContext(CartContext);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.menuItem?.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Update item quantity
  const updateQuantity = async (menuItemId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        alert("Quantity cannot be less than 1.");
        return;
      }

      // Calculate the difference between the new and current quantity
      const currentQuantity = cartItems.find((item) => item.menuItem._id === menuItemId)?.quantity || 0;
      const quantityDifference = newQuantity - currentQuantity;

      // Call the addToCartHandler with the difference
      await addToCartHandler(menuItemId, quantityDifference);
    } catch (err) {
      console.error("Error updating cart item:", err);
      alert("Failed to update item quantity. Please try again.");
    }
  };

  // Remove item from cart
  const removeItem = async (menuItemId) => {
    try {
      await removeFromCartHandler(menuItemId); // Remove item from the backend
    } catch (err) {
      console.error("Error removing cart item:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart 🛒</h2>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => {
            return (
              <div key={item.menuItem?._id} className="card mb-3 shadow-sm">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.menuItem?.image || "https://via.placeholder.com/150"}
                      alt={item.menuItem?.name || "Unknown Item"}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.menuItem?.name || "Unknown Item"}</h5>
                      <p className="card-text text-danger">₹{item.menuItem?.price || 0}</p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() =>
                            updateQuantity(item.menuItem?._id, Math.max(1, item.quantity - 1))
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => updateQuantity(item.menuItem?._id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-auto"
                          onClick={() => removeItem(item.menuItem?._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Order Summary */}
          <div className="mt-4">
            <h4>Order Summary</h4>
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax (10%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-success w-100 mt-3">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted">Your cart is empty. Add items to get started!</p>
      )}
    </div>
  );
};

export default CartPage;