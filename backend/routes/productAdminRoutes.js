import express from "express";
import Product from "../models/Product.js";
import { verifyUser, checkIsAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products
// @access Private/Admin Only
router.get("/", verifyUser, checkIsAdmin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
