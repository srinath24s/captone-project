const express = require('express');
const { addToWishlist, getWishlist, removeFromCart, removeFromWishlist, clearWishlist, clearCart, updateCartItem, getCart, addToCart } = require('../controllers/user');
const router = express.Router();


router.post('/wishlist/add', addToWishlist);
router.get('/wishlist/:userId', getWishlist);
router.post('/wishlist/remove', removeFromWishlist);
router.post('/wishlist/clear', clearWishlist);

router.post('/cart/add', addToCart);
router.get('/cart/:userId', getCart);
router.post('/cart/update', updateCartItem);
router.post('/cart/remove', removeFromCart);
router.post('/cart/clear', clearCart);


module.exports = router;
