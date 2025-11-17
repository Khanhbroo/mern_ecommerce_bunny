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

// @route POST /api/admin/users
// @desc Add a new user
// @access Private/Admin
router.post("/users", verifyUser, checkIsAdmin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ menssage: "User already existed" });
    user = new User({ name, email, password, role: role || "customer" });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
