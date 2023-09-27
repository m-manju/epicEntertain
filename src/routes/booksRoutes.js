const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/books', booksController.fetchBooksForUser);

module.exports = router;
