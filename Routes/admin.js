const express = require('express');
const {createUser, loginUser, getUsers } = require('../controllers/admin');
const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/users', getUsers);


module.exports = router;
