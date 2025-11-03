import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Registration logic here
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    // Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "4h" },
      (error, token) => {
        if (error) throw error;

        // Send the user and token in response
        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// @route POST /api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Email must be provided!" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password!" });

    // Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with the user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "4h" },
      (error, token) => {
        if (error) throw error;

        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log("Login error", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// @route GET /api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", verifyUser, async (req, res) => {
  res.json(req.user);
});

export default router;
