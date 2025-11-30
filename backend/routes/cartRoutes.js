import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

import { verifyUser } from "../middleware/authMiddleware.js";

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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart for the guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color
    );

    if (productIndex > -1) {
      // Update the quantity
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // Remove the product if the quantity equals to 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route DELETE /api/cart
// @desc Remove a product from the cart
// @access Public
router.delete("/", async (req, res) => {
  const { productId, size, color, userId, guestId } = req.body;

  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "Cart Not Found" });

    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      cart.totalPrice = cart.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in the cart" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;

  try {
    const cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", verifyUser, async (req, res) => {
  const { guestId } = req.body;

  try {
    // Find the guest cart and the user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json({ message: "Cart do not have product" });
      }

      if (userCart) {
        // Merge guest cart into user cart
        guestCart.products.forEach((guestProduct) => {
          const productIndex = userCart.products.findIndex(
            (userProduct) =>
              userProduct.productId.toString() ===
                guestProduct.productId.toString() &&
              userProduct.color === guestProduct.color &&
              userProduct.size === guestProduct.size
          );

          if (productIndex > -1) {
            // If the items exist in the user cart, update the quantity
            userCart.products[productIndex].quantity += guestProduct.quantity;
          } else {
            // Otherwise, add the guest item to the cart
            userCart.products.push(guestProduct);
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        );

        await userCart.save();

        // Remove the guest cart after merging
        try {
          await Cart.findByIdAndDelete({ guestId });
        } catch (error) {
          console.log("Error deleting guest cart:", error);
        }

        return res.status(200).json(userCart);
      } else {
        // If the user has no existing cart, assign the guest cart to the user
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;

        await guestCart.save();

        return res.status(200).json(guestCart);
      }
    } else {
      if (userCart) {
        // The guest cart has already been merged, return user cart
        return res.status(200).json(userCart);
      }
      return res.status(404).json({ message: "Guest cart not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
