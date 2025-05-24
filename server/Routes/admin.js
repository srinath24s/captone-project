const express = require('express');
const {createUser, loginUser, getUsers, addProduct, getProducts, editUser, deleteUser } = require('../controllers/admin');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/user/:id', editUser);
router.delete('/user/:id', deleteUser);
router.post('/addproduct', addProduct);
router.get('/products', getProducts);


module.exports = router;
