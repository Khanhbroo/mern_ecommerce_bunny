import express from "express";
import User from "../models/User.js";
import { verifyUser, checkIsAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private/Admin

router.get("/", verifyUser, checkIsAdmin, async (req, res) => {
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
router.post("/", verifyUser, checkIsAdmin, async (req, res) => {
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

// @router PUT /api/admin/users/:id
// @desc Update user's info
// @access Private/Admin
router.put("/:id", verifyUser, checkIsAdmin, async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ message: "User not existed" });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// @route DELETE /api/users/:id
// @desc Delete a user
// @access Private/Admin
router.delete("/:id", verifyUser, checkIsAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ message: "User not existed" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
