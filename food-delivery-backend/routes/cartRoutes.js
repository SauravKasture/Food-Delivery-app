const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/User");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Fetch user's cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   menuItem:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *                   quantity:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details from the database
    const user = await User.findById(userId).populate("cart.menuItem");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Fetched cart items:", user.cart); // Debug log
    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add or update an item in the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menuItemId:
 *                 type: string
 *               quantity:
 *                 type: number
 *             example:
 *               menuItemId: "65b8c7f9a1b2c3d4e5f6g7h8"
 *               quantity: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menuItem:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     image:
 *                       type: string
 *                 quantity:
 *                   type: number
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or menu item not found
 *       500:
 *         description: Server error
 */
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;

    // Validate request body
    if (!menuItemId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input. Quantity must be greater than 0." });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the menu item is already in the cart
    const existingCartItem = user.cart.find(
      (item) => item.menuItem.toString() === menuItemId
    );

    if (existingCartItem) {
      // Update the quantity
      existingCartItem.quantity += quantity; // Increment quantity
    } else {
      // Add the menu item to the cart
      user.cart.push({ menuItem: menuItemId, quantity });
    }

    await user.save();

    // Populate the menuItem field to include details
    await user.populate("cart.menuItem");

    // Return the newly added/updated item
    const newItem = user.cart.find((item) => item.menuItem._id.toString() === menuItemId);
    res.status(200).json(newItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @swagger
 * /api/cart/remove/{menuItemId}:
 *   delete:
 *     summary: Remove an item from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuItemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu item to remove
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or menu item not found
 *       500:
 *         description: Server error
 */
router.delete("/remove/:menuItemId", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.params;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the menu item from the cart
    user.cart = user.cart.filter(
      (item) => item.menuItem.toString() !== menuItemId
    );

    await user.save();

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;