const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const booksController = require('../controllers/books');

router.post('/add-book',verifyToken, booksController.upload.single('image'), booksController.addBookWithImage);

router.put('/edit/:bookId', verifyToken, booksController.editBook);

router.delete('/delete/:bookId', verifyToken, booksController.deleteBook);

module.exports = router;
