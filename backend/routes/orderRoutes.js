import express from "express";
import Order from "../models/Order.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private
router.get("/my-orders", verifyUser, async (req, res) => {
  try {
    // Find orders for the authenticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); // sort by most recent orders

    if (!orders) return res.status(404).json({ message: "Orders not found" });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route GET /api/orders/:id
// @desc Ger order details by ID
// @access Private
router.get("/:id", verifyUser, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Return the full order details
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
