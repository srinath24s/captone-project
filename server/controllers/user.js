const Cart = require("../models/cartUser");
const Wishlist = require("../models/wishlist");

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) throw new Error("userId and productId required");

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { productIds: productId } }, 
      { upsert: true, new: true }
    );

    res.json({ status: "ok", result: wishlist });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.json({ status: "ok", result: [] });

    res.json({ status: "ok", result: wishlist.productIds });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) throw new Error("userId and productId required");

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { productIds: productId } },
      { new: true }
    );

    res.json({ status: "ok", result: wishlist });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const clearWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) throw new Error("userId required");

    await Wishlist.findOneAndDelete({ userId });
    res.json({ status: "ok", result: "Wishlist cleared" });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId) throw new Error("userId and productId required");

    // Check if cart exists for user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity: quantity || 1 }]
      });
    } else {
      // Check if product exists in items
      const itemIndex = cart.items.findIndex(item => item.productId === productId);
      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        // Add new item
        cart.items.push({ productId, quantity: quantity || 1 });
      }
    }

    await cart.save();
    res.json({ status: "ok", result: cart });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ status: "ok", result: [] });

    res.json({ status: "ok", result: cart.items });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) throw new Error("userId, productId, and quantity required");

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) throw new Error("Product not in cart");

    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    res.json({ status: "ok", result: cart });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) throw new Error("userId and productId required");

    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(item => item.productId !== productId);

    await cart.save();
    res.json({ status: "ok", result: cart });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) throw new Error("userId required");

    await Cart.findOneAndDelete({ userId });
    res.json({ status: "ok", result: "Cart cleared" });
  } catch (error) {
    res.json({ status: "Error", result: error.message });
  }
};



module.exports = {
    addToWishlist,getWishlist,removeFromWishlist,clearWishlist,addToCart,getCart,updateCartItem,removeFromCart,clearCart
}