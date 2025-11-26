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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route GET /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put("/:id", verifyUser, checkIsAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "No order found" });

    order.status = req.body.status || order.status;
    order.isDelivered = req.body.status === "Delivered" ? true : false;
    order.deliveredAt =
      req.body.status === "Delivered" ? Date.now() : undefined;

    const updatedOrder = await order.save();

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/Admin
router.delete("/:id", verifyUser, checkIsAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.deleteOne();
    res.status(200).json({ message: "Order removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
