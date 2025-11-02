import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Registration logic here
    res.send({ name, email, password });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

export default router;
