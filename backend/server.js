import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimiterMiddleware } from "./rateLimit/connect.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

// Rate limit each incoming request
app.use(rateLimiterMiddleware);

app.get("/", (req, res) => {
  console.log("Request received");
  res.send({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
