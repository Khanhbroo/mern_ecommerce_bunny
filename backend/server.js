import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimiterMiddleware } from "./rateLimit/connect.js";
import connecDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

// Rate limit each incoming request
app.use(rateLimiterMiddleware);

// Connect to MongoDB
await connecDB();

// API routes
// @desc Routes for users
app.use("/api/users", userRoutes);
// @desc Routes for products
app.use("/api/products", productRoutes);
// @desc Routers for carts
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
