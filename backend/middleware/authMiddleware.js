import jwt from "jsonwebtoken";
import User from "../models/User.js";

// // Middleware to protect user routes
const verifyUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.user.id).select("-password"); // Exclude password
      next();
    } catch (error) {
      console.log("Token verification failed:", error);
      res.status(401).json({ message: "Unauthorized, token invalid" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized, no token provided" });
  }
};

// Middleware to check if the user is an admin
const checkIsAdmin = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Only admin is allowed to do this" });
  }
};

export { verifyUser, checkIsAdmin };
