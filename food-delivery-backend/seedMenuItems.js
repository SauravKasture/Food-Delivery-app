require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");

(async () => {
  try {
    // Connect to MongoDB Atlas with increased timeout
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      family: 4, // Use IPv4
    });
    console.log("Connected to MongoDB Atlas");

    // Clear existing data (optional)
    await MenuItem.deleteMany();
    console.log("Cleared existing menu items.");

    // Define sample menu items
    const menuItems = [
      {
        name: "Pizza",
        price: 250,
        category: "Food",
        image: "https://via.placeholder.com/150?text=Pizza",
      },
      {
        name: "Burger",
        price: 150,
        category: "Food",
        image: "https://via.placeholder.com/150?text=Burger",
      },
      {
        name: "Pasta",
        price: 200,
        category: "Food",
        image: "https://via.placeholder.com/150?text=Pasta",
      },
      {
        name: "Sushi",
        price: 300,
        category: "Food",
        image: "https://via.placeholder.com/150?text=Sushi",
      },
      {
        name: "Salad",
        price: 100,
        category: "Food",
        image: "https://via.placeholder.com/150?text=Salad",
      },
    ];

    // Insert menu items into the database
    await MenuItem.insertMany(menuItems);
    console.log("Menu items seeded successfully.");
  } catch (error) {
    console.error("Error seeding menu items:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
})();