import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const Admin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({
    weeklyOrders: 0,
    weeklyRevenue: 0,
    monthlyOrders: 0,
    monthlyRevenue: 0,
    yearlyOrders: 0,
    yearlyRevenue: 0,
  });

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch menu items
        const menuItemsResponse = await axiosInstance.get("/api/admin/menu-items");
        setMenuItems(menuItemsResponse.data);

        // Fetch orders
        const ordersResponse = await axiosInstance.get("/api/admin/orders");
        setOrders(ordersResponse.data);

        // Fetch users with order counts
        const usersResponse = await axiosInstance.get("/api/admin/users");
        setUsers(usersResponse.data);

        // Fetch order analytics
        const analyticsResponse = await axiosInstance.get("/api/admin/order-analytics");
        setAnalytics(analyticsResponse.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        alert(err.response?.data?.message || "Failed to load admin data.");
      }
    };

    fetchAdminData();
  }, []);

  // Add a new menu item
  const addMenuItem = async () => {
    try {
      const name = prompt("Enter menu item name:");
      const price = parseFloat(prompt("Enter menu item price:"));
      const category = prompt("Enter menu item category:");
      const image = prompt("Enter menu item image URL (optional):");

      if (!name || !price || !category) {
        return alert("Name, price, and category are required.");
      }

      const response = await axiosInstance.post("/api/admin/menu-items", {
        name,
        price,
        category,
        image,
      });
      setMenuItems((prevItems) => [...prevItems, response.data.menuItem]);
      alert("Menu item added successfully!");
    } catch (err) {
      console.error("Error adding menu item:", err);
      alert(err.response?.data?.message || "Failed to add menu item.");
    }
  };

  // Update a menu item
  const updateMenuItem = async (id) => {
    try {
      const menuItem = menuItems.find((item) => item._id === id);
      const newName = prompt("Enter new name:", menuItem.name);
      const newPrice = parseFloat(prompt("Enter new price:", menuItem.price));
      const newCategory = prompt("Enter new category:", menuItem.category);
      const newImage = prompt("Enter new image URL (optional):", menuItem.image);

      if (!newName && !newPrice && !newCategory && !newImage) {
        return alert("At least one field is required for update.");
      }

      const response = await axiosInstance.put(`/api/admin/menu-items/${id}`, {
        name: newName || menuItem.name,
        price: newPrice || menuItem.price,
        category: newCategory || menuItem.category,
        image: newImage || menuItem.image,
      });

      setMenuItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? response.data.updatedMenuItem : item))
      );
      alert("Menu item updated successfully!");
    } catch (err) {
      console.error("Error updating menu item:", err);
      alert(err.response?.data?.message || "Failed to update menu item.");
    }
  };

  // Delete a menu item
  const deleteMenuItem = async (id) => {
    try {
      await axiosInstance.delete(`/api/admin/menu-items/${id}`);
      setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
      alert("Menu item deleted successfully!");
    } catch (err) {
      console.error("Error deleting menu item:", err);
      alert(err.response?.data?.message || "Failed to delete menu item.");
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId) => {
    try {
      const newStatus = prompt("Enter new status (Pending, Processing, Shipped, Delivered):");
      if (!["Pending", "Processing", "Shipped", "Delivered"].includes(newStatus)) {
        return alert("Invalid status.");
      }

      const response = await axiosInstance.put(`/api/admin/orders/${orderId}/status`, {
        status: newStatus,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? response.data.updatedOrder : order))
      );
      alert("Order status updated successfully!");
    } catch (err) {
      console.error("Error updating order status:", err);
      alert(err.response?.data?.message || "Failed to update order status.");
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    try {
      await axiosInstance.delete(`/api/admin/orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      alert("Order deleted successfully!");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert(err.response?.data?.message || "Failed to delete order.");
    }
  };

  return (
    <div className="admin-dashboard container mt-4">
      <h1 className="text-center mb-4">Admin Panel</h1>

      {/* Order Analytics Section */}
      <h2 className="mb-3">Order Analytics</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Weekly Orders</h5>
              <p className="card-text">{analytics.weeklyOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Weekly Revenue</h5>
              <p className="card-text">₹{analytics.weeklyRevenue}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Monthly Orders</h5>
              <p className="card-text">{analytics.monthlyOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Monthly Revenue</h5>
              <p className="card-text">₹{analytics.monthlyRevenue}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Yearly Orders</h5>
              <p className="card-text">{analytics.yearlyOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Yearly Revenue</h5>
              <p className="card-text">₹{analytics.yearlyRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <h2 className="mt-5 mb-3">Users</h2>
      <div className="row">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Orders Placed:</strong> {user.orderCount}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>

      {/* Orders Section */}
      <h2 className="mt-5 mb-3">Orders</h2>
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
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || "Unknown User"}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => updateOrderStatus(order._id)}
                    >
                      Update Status
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Menu Items Section */}
      <h2 className="mt-5 mb-3">Menu Items</h2>
      <button className="btn btn-primary mb-3" onClick={addMenuItem}>
        Add Menu Item
      </button>
      <div className="row">
        {menuItems.length > 0 ? (
          menuItems.map((menuItem) => (
            <div key={menuItem._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                {/* Fixed Image Size */}
                <img
                  src={menuItem.image || "https://via.placeholder.com/150"}
                  alt={menuItem.name}
                  className="card-img-top"
                  style={{ height: "250px", width: "100%", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{menuItem.name}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{menuItem.price}
                  </p>
                  <p className="card-text">
                    <strong>Category:</strong> {menuItem.category}
                  </p>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => updateMenuItem(menuItem._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMenuItem(menuItem._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;