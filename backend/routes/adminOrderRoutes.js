import express from "express";
import Order from "../models/Order.js";
import { verifyUser, checkIsAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders
// @access Private/Admin
router.get("/", verifyUser, checkIsAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
