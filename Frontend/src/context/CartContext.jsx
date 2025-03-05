import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get("/api/cart");
        const items = response.data;

        // Validate the structure of cart items
        if (!Array.isArray(items)) {
          console.error("Invalid cart data received:", items);
          return;
        }

        setCartItems(items);
        setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchCart();
  }, []);

  // Add item to cart
  const addToCartHandler = async (menuItemId, quantityDifference) => {
    try {
      const response = await axiosInstance.post("/api/cart/add", { menuItemId, quantity: quantityDifference });
      const newItem = response.data;

      // Log the backend response for debugging
      console.log("Backend response for adding item:", newItem);

      // Validate the new item structure
      if (!newItem.menuItem || !newItem.menuItem._id) {
        console.error("Invalid item received from backend:", newItem);
        throw new Error("Invalid item received from backend.");
      }

      // Update cart items
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.menuItem._id === menuItemId);
        if (existingItem) {
          return prevItems.map((item) =>
            item.menuItem._id === menuItemId
              ? { ...item, quantity: item.quantity + quantityDifference }
              : item
          );
        }
        return [...prevItems, newItem];
      });

      // Recalculate cart count
      setCartCount((prevCount) => prevCount + quantityDifference);
    } catch (err) {
      console.error("Error adding item to cart:", err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // Remove item from cart
  const removeFromCartHandler = async (menuItemId) => {
    try {
      await axiosInstance.delete(`/api/cart/remove/${menuItemId}`);
      setCartItems((prevItems) => {
        const removedItem = prevItems.find((item) => item.menuItem._id === menuItemId);
        const updatedItems = prevItems.filter((item) => item.menuItem._id !== menuItemId);
        setCartCount((prevCount) => prevCount - (removedItem?.quantity || 0));
        return updatedItems;
      });
    } catch (err) {
      console.error("Error removing item from cart:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]); // Clear cart items
    setCartCount(0); // Reset cart count
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCartHandler, removeFromCartHandler, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};