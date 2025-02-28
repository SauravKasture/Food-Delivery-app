import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderDetails from "./pages/OrderDetails";
import ForgotPassword from "./pages/ForgotPassword"; // Import ForgotPassword
import ContactUs from "./pages/ContactUs"; // Import ContactUs
import TrackOrder from "./pages/TrackOrder"; // Import TrackOrder
import Profile from "./pages/Profile"; // Import Profile

const App = () => {
  const [userRole, setUserRole] = useState("guest"); // Simulated user role (guest, user, admin)
  const [cartItems, setCartItems] = useState([]); // Simulated cart items
  const [userName, setUserName] = useState(""); // Simulated user name

  // Check if user is logged in (JWT token exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserRole(decodedToken.role || "user");
        setUserName(decodedToken.name || "User");
      } catch (error) {
        console.error("Error decoding token:", error);
        handleLogout(); // Log out if the token is invalid
      }
    }
  }, []);

  // Simulate login/logout functionality
  const handleLogin = (role, name) => {
    setUserRole(role); // Set user role to "user" or "admin"
    setUserName(name); // Set user name
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    setUserRole("guest");
    setCartItems([]); // Clear cart on logout
    setUserName(""); // Clear user name
  };

  // ProtectedRoute Component
  const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" />;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    if (requiredRole && decodedToken.role !== requiredRole) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      {/* Navbar */}
      <Navbar
        userRole={userRole}
        userName={userName} // Pass user name to Navbar
        handleLogout={handleLogout}
        cartItemCount={cartItems.length} // Pass cart item count to Navbar
      />
      {/* Main Content */}
      <div className="container-fluid">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home userRole={userRole} userName={userName} />} />
          <Route
            path="/login"
            element={<Login setUserRole={handleLogin} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/menu"
            element={<Menu cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route path="/about" element={<About userRole={userRole} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New Route */}
          <Route path="/contact-us" element={<ContactUs />} /> {/* New Route */}
          {/* Authenticated Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage cartItems={cartItems} setCartItems={setCartItems} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-order"
            element={
              <ProtectedRoute>
                <TrackOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-details/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {/* Footer */}
      <Footer userRole={userRole} />
    </Router>
  );
};

export default App;