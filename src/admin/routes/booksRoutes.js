const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const booksController = require('../controllers/books');
const upload = require('../../config/multer');
const checkUserRole = require('../../middleware/checkUserRoles');


router.post('/add-book', verifyToken, checkUserRole([1]),  upload.single('image'), booksController.addBookWithImage);

router.put('/edit/:bookId', verifyToken, checkUserRole([2]), booksController.editBook);

router.delete('/delete/:bookId', verifyToken, checkUserRole([3]), booksController.deleteBook);


module.exports = router;



