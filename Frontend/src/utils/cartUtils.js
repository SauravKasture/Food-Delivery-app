import axiosInstance from "./axiosInstance";

// Fetch cart items
export const fetchCartItems = async () => {
  try {
    console.log("Fetching cart items..."); // Debug log
    const response = await axiosInstance.get("/api/cart");
    console.log("API Response:", response.data); // Debug log

    // Transform the response data into the expected format
    return response.data.map((item) => ({
      menuItem: item.menuItem,
      quantity: item.quantity,
    }));
  } catch (err) {
    console.error("Error fetching cart items:", err);
    throw new Error(err.response?.data?.message || "Failed to load cart items.");
  }
};

// Add or update an item in the cart
export const addToCart = async (menuItemId, quantity) => {
  try {
    await axiosInstance.post("/api/cart/add", { menuItemId, quantity });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    throw new Error(err.response?.data?.message || "Failed to add item to cart.");
  }
};

// Remove an item from the cart
export const removeFromCart = async (menuItemId) => {
  try {
    await axiosInstance.delete(`/api/cart/remove/${menuItemId}`);
  } catch (err) {
    console.error("Error removing item from cart:", err);
    throw new Error(err.response?.data?.message || "Failed to remove item from cart.");
  }
};