const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");
const { swaggerDocs, swaggerUi } = require("./swagger");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON requests <--- ADD THIS LINE // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Test Database Connection
app.get("/test-db", async (req, res) => {
  try {
    await mongoose.connection.db.listCollections().toArray();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Food Delivery Backend is Running!");
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  });
};

// Routes
app.use("/api/auth", authRoutes);

// Protected Route Example
// app.get("/api/profile", authenticateToken, (req, res) => {
//   res.json({ message: "Profile data", user: req.user });
// });

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});