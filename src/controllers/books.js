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


module.exports = {
  fetchBooksForUser,
  getBookDetailsById,
}
