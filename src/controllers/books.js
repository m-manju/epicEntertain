const path = require('path');
const multer = require('multer');
const booksModel = require('../models/books');

const fetchBooksForUser = async (req, res) => {
  try {
    console.log('Fetching books');
    const books = await booksModel.getBooksForUser();
    console.log('Fetched books:', books);
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getBookDetailsById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookDetails = await booksModel.getBookDetailsById(bookId);
    if (!bookDetails) {
      return res.status(404).json({ error: 'Book is not found' });
    }
    res.json(bookDetails);
    console.log('fetching book details successful');
  } catch (error) {
    console.error('Error in fetching book details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    const fileName = uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const addBookWithImage = async (req, res) => {
  try {
    const { name, description, author_id, isbn, publication_year } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }
    const imageUrl = req.file.path; 
    const bookId = await booksModel.addBook(name, description, author_id, isbn, publication_year, imageUrl);
    
    console.log('Book added successfully');
    res.status(201).json({ message: 'Book added successfully', bookId });
  } catch (error) {
    console.error('Error adding book with image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  fetchBooksForUser,
  getBookDetailsById,
  addBookWithImage,
  upload,
}
