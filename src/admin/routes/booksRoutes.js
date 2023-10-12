const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const verifyRole = require('../../middleware/roleAuthentication');
const verifyacess = require('../../middleware/checkAdminPermission');
const booksController = require('../controllers/books');

router.post('/add-book', verifyToken, booksController.upload.single('image'), booksController.addBookWithImage);
router.put('/edit/:bookId', verifyToken, booksController.editBook);
router.delete('/delete/:bookId',verifyToken, verifyRole, verifyacess, booksController.deleteBook);

module.exports = router;
