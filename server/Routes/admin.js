const express = require('express');
const {createUser, loginUser, getUsers, addProduct, getProducts } = require('../controllers/admin');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.post('/addproduct', addProduct);
router.get('/products', getProducts);


module.exports = router;
