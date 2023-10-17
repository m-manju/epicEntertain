const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const booksController = require('../controllers/books');
const upload = require('../../config/multer');
const checkUserRole = require('../../middleware/checkUserRoles');
const checkAdminPermissions = require('../../middleware/checkPermissions');


router.post('/add-book', verifyToken, checkUserRole([1]),  upload.single('image'), booksController.addBookWithImage);

router.post('/add-books-from-excel', verifyToken, checkUserRole([1]), upload.single('excel'), booksController.addBooksFromExcel); 

router.put('/edit/:bookId', verifyToken, checkUserRole([2]), booksController.editBook);

router.delete('/delete/:bookId', verifyToken, checkAdminPermissions([3]), booksController.deleteBook);


module.exports = router;



