const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Fetch all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Menu items fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 *                   image:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log("Fetched menu items:", menuItems); // Debug log
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;