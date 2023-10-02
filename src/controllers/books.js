const booksModel = require('../models/books');

const fetchBooksForUser = async (req, res) => {
  try {
    const userId = req.user;
    const results = await new Promise((resolve, reject) => {
      booksModel.getBooksForUser(userId, (err, results) => {
        if (err) {
          console.error('Error in querying books:', err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    res.json(results);
    console.log('fetching books successful');
  } catch (error) {
    console.error('Error in fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
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
