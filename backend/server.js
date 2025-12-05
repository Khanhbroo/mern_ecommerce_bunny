import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimiterMiddleware } from "./rateLimit/connect.js";
import connecDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import adminRoutes from "./routes/adminUserRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

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
// @desc Routers for checkouts
app.use("/api/checkout", checkoutRoutes);
// @desc Routers for orders
app.use("/api/orders", orderRoutes);
// @desc Routers for uploading
app.use("/api/upload", uploadRoutes);
// @desc Routers for subscribing
app.use("/api/subscribe", subscriberRoutes);

// Admin routes
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
