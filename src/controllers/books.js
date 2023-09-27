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

    res.json(results);
    console.log('fetching successful');
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  fetchBooksForUser,
};

