import express from "express";
import User from "../models/User.js";
import { verifyUser, checkIsAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private/Admin

router.get("/users", verifyUser, checkIsAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
