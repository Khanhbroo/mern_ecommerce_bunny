import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimiterMiddleware } from "./rateLimit/connect.js";
import connecDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

// Rate limit each incoming request
app.use(rateLimiterMiddleware);

// Connect to MongoDB
await connecDB();

// User routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  console.log("Request received");
  res.send("Welcome to the Ecommerce Bunny API");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
