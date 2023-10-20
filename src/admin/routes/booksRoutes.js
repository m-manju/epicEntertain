const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const booksController = require('../controllers/books');
const upload = require('../../config/multer');
const checkAdminPermissions = require('../../middleware/checkPermissions');

router.post('/addBook', verifyToken, checkAdminPermissions([1]),  upload.single('image'), booksController.addBookWithImage);

router.post('/addBooksFromExcel', verifyToken, checkAdminPermissions([1]), upload.single('excel'), booksController.addBooksFromExcel); 

router.put('/edit/:bookId', verifyToken, checkAdminPermissions([2]), booksController.editBook);

router.delete('/delete/:bookId', verifyToken, checkAdminPermissions([3]), booksController.deleteBook);

router.post('/addBookWithFile',verifyToken, checkAdminPermissions([1]), upload.single('book_file'), booksController.addBookWithFile);

router.get('/getBook/:bookId', booksController.getBookFile);


module.exports = router;

