const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const isAdmin = require("../middleware/isAdmin");
const MenuItem = require("../models/MenuItem");
const Order = require("../models/Order");
const User = require("../models/User");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admin/menu-items:
 *   get:
 *     summary: Fetch all menu items
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Menu items fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/menu-items", authenticateToken, isAdmin, async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log("Fetched menu items:", menuItems); // Debug log
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/menu-items:
 *   post:
 *     summary: Add a new menu item
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Menu item added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/menu-items", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, price, category, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price, and category are required." });
    }

    const menuItem = new MenuItem({ name, price, category, image });
    await menuItem.save();

    console.log("Added menu item:", menuItem); // Debug log
    res.status(201).json({ message: "Menu item added successfully.", menuItem });
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/menu-items/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */
router.put("/menu-items/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, image } = req.body;

    if (!name && !price && !category && !image) {
      return res.status(400).json({ message: "At least one field is required for update." });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, price, category, image },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    console.log("Updated menu item:", updatedMenuItem); // Debug log
    res.status(200).json({ message: "Menu item updated successfully.", updatedMenuItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/menu-items/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu item to delete
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */
router.delete("/menu-items/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    console.log("Deleted menu item:", deletedMenuItem); // Debug log
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Fetch all orders
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/orders", authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    console.log("Fetched orders:", orders); // Debug log
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/orders/{id}/status:
 *   put:
 *     summary: Update order status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Pending", "Processing", "Shipped", "Delivered"]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.put("/orders/:id/status", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Processing", "Shipped", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    console.log("Updated order status:", updatedOrder); // Debug log
    res.status(200).json({ message: "Order status updated successfully.", updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.delete("/orders/:id", authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found." });
    }

    console.log("Deleted order:", deletedOrder); // Debug log
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Fetch all users with their order counts
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/users", authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "user",
          as: "orders",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          orderCount: { $size: "$orders" },
        },
      },
    ]);
    console.log("Fetched users with order counts:", users); // Debug log
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/admin/order-analytics:
 *   get:
 *     summary: Fetch order analytics (weekly, monthly, yearly)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order analytics fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/order-analytics", authenticateToken, isAdmin, async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const weeklyOrders = await Order.countDocuments({ createdAt: { $gte: startOfWeek } });
    const weeklyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const monthlyOrders = await Order.countDocuments({ createdAt: { $gte: startOfMonth } });
    const monthlyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const yearlyOrders = await Order.countDocuments({ createdAt: { $gte: startOfYear } });
    const yearlyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfYear } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.status(200).json({
      weeklyOrders,
      weeklyRevenue: weeklyRevenue.length > 0 ? weeklyRevenue[0].total : 0,
      monthlyOrders,
      monthlyRevenue: monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0,
      yearlyOrders,
      yearlyRevenue: yearlyRevenue.length > 0 ? yearlyRevenue[0].total : 0,
    });
  } catch (error) {
    console.error("Error fetching order analytics:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;