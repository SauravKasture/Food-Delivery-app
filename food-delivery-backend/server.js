const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // Import auth routes
const menuRoutes = require("./routes/menuRoutes"); // Import menu routes
const orderRoutes = require("./routes/orderRoutes"); // Import order routes
const userRoutes = require("./routes/userRoutes"); // Import user routes
const cartRoutes = require("./routes/cartRoutes"); // Import cart routes
const adminRoutes = require("./routes/adminRoutes");
const authenticateToken = require("./middleware/authenticateToken"); // Import middleware
const isAdmin=require("./middleware/isAdmin")
const { swaggerDocs, swaggerUi } = require("./swagger");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: "https://food-delivery-app-wbdz.onrender.com", // Replace with your frontend URL
  credentials: true,
})); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB fails to connect
  });

// Test Database Connection
app.get("/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.listCollections().toArray();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    console.error("Database test error:", error); // Added detailed logging
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Food Delivery Backend is Running!");
});

// Routes
app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/orders", orderRoutes); // Use order routes
app.use("/api/user", userRoutes); // Register user routes under /api/user
app.use("/api/menu", menuRoutes); // Register menu routes under /api/menu
app.use("/api/cart", cartRoutes); // Register cart routes under /api/cart
// Register admin routes
app.use("/api/admin", adminRoutes);

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled server error:", err.stack); // Added detailed logging
  res.status(500).json({ message: "Something went wrong on the server." });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});