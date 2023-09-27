const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken');
const booksController = require('../controllers/books'); 


router.post('/signup', registerUser);
router.post('/login', loginUser);

module.exports = router;
