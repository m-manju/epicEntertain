const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const booksController = require('../controllers/books');

router.get('/books',verifyToken, booksController.fetchBooksForUser);

router.get('/:bookId', verifyToken, booksController.getBookDetailsById);

router.post('/add-book',verifyToken, booksController.upload.single('image'), booksController.addBookWithImage);


module.exports = router;
