const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "" }, // Optional image URL
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);