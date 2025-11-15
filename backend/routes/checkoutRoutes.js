import express from "express";
import Checkout from "../models/Checkout";
import Order from "../models/Order";
import Cart from "../models/Cart";
import Product from "../models/Product";

import { verifyUser } from "../middleware/authMiddleware";

const router = express.Router();

export default router;
