const path = require('path');
const multer = require('multer');
const booksModel = require('../models/books');


const fetchBooksForUser = async (req, res) => {
  try {
    const userId = req.body;
    const results = await new Promise((resolve, reject) => {
      booksModel.getBooksForUser(userId, (err, results) => {
        if (err) {
          console.error('Error querying books:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    res.json({success: false, results} );
    console.log('fetching successful');
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({  success: false, error: 'Internal server error' });
  }
};


const getBookDetailsById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookDetails = await booksModel.getBookDetailsById(bookId);
    if (!bookDetails) {
      return res.status(404).json({ error: 'Book is not found' });
    }
    res.json({success: true, bookDetails});
    console.log('fetching book details successfuly');
  } catch (error) {
    console.error('Error in fetching book details:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
  }
};


module.exports = {
  fetchBooksForUser,
  getBookDetailsById,
}

