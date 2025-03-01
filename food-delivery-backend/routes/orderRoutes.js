const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authenticateToken = require("../middleware/authenticateToken");

// Create a new order
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuItem:
 *                       type: string
 *                       description: ID of the menu item
 *                     quantity:
 *                       type: number
 *                       description: Quantity of the menu item
 *               totalAmount:
 *                 type: number
 *                 description: Total amount of the order
 *               deliveryAddress:
 *                 type: string
 *                 description: Delivery address for the order
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Invalid items provided." });
    }
    if (!totalAmount || typeof totalAmount !== "number") {
      return res.status(400).json({ message: "Invalid total amount provided." });
    }
    if (!deliveryAddress || typeof deliveryAddress !== "string") {
      return res.status(400).json({ message: "Invalid delivery address provided." });
    }

    const userId = req.user.id; // Extract user ID from the token

    // Create the order in the database
    const order = new Order({
      user: userId,
      items,
      totalAmount,
      deliveryAddress,
      status: "Pending", // Default status
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully.", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error while placing order." });
  }
});

// Fetch all orders for the logged-in user
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Fetch all orders for the logged-in user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         menuItem:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             price:
 *                               type: number
 *                         quantity:
 *                           type: number
 *                   totalAmount:
 *                     type: number
 *                   deliveryAddress:
 *                     type: string
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch orders for the user
    const orders = await Order.find({ user: userId })
      .populate("items.menuItem")
      .sort({ createdAt: -1 }); // Sort by most recent orders

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch details of a specific order by ID
/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Fetch details of a specific order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to fetch
 *     responses:
 *       200:
 *         description: Order details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       menuItem:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           price:
 *                             type: number
 *                       quantity:
 *                         type: number
 *                 totalAmount:
 *                   type: number
 *                 deliveryAddress:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get("/:orderId", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    // Fetch the order by ID and ensure it belongs to the logged-in user
    const order = await Order.findOne({ _id: orderId, user: userId }).populate("items.menuItem");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;