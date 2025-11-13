import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

// Helper function to get a cart by the user ID or guest ID
const getCart = async (userId, guestId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);

    // If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (product) =>
          product.productId.toString() === productId &&
          product.size === size &&
          product.color === color
      );

      if (productIndex > -1) {
        // If the product already exists, update the quantity
        cart.products[productIndex].quantity += Number(quantity);
      } else {
        // Add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: Number(product.price),
          size,
          color,
          quantity,
        });
      }

      //  Recalculate the total price
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      // Create a new cart for the guest or user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        guestId: guestId ? guestId : "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: Number(product.price),
            size,
            color,
            quantity,
          },
        ],
        totalPrice: Number(product.price) * Number(quantity),
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
