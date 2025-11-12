// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Product from "./models/Product.js";
// import User from "./models/User.js";
// import { products } from "./data/products.js";

import mongoose from "mongoose";
import Product from "./models/Product";
import User from "./models/User";
import { products } from "./data/products";
import Cart from "./models/Cart";

// dotenv.config();

// // Connect to mongoDB
mongoose.connect(process.env.MONGODB_URI);

// Function to seed data
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin User
    const adminUser = await User.create({
      name: "ChipChip",
      email: "kgiaacutelam2005@gmail.com",
      password: "Chipxinhgaisieucapvutru@@",
      role: "admin",
    });

    // Assign the default user ID to each product
    const userId = adminUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userId };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts);
    console.log("😁 Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.log("Error seeding the data", error);
    process.exit(1);
  }
};

seedData();
