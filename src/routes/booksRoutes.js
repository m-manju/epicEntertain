const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const booksController = require('../controllers/books');

router.get('/books',verifyToken, booksController.fetchBooksForUser);

router.get('/:bookId', verifyToken, booksController.getBookDetailsById);

module.exports = router;
