const db = require('../config/db');

const getBooksForUser = (userId, callback) => {
  const selectQuery = `
  select books.id, books.name as 'book name',
  authors.name as 'author name', authors.bio as 'author bio',
  description,isbn,publication_year  
  from books join authors on books.author_id = authors.id;`;

  db.query(selectQuery, [userId], (err, results) => {
    if (err) {
      return callback(err);
    } callback(null, results); });
};

const getBookDetailsById = (bookId) => {
  return new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM books WHERE id = ?';
    db.query(selectQuery, [bookId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        if (results.length === 0) {
          resolve(null); 
        } else {
          resolve(results[0]); 
        }}
    });
  });
};

module.exports = {
  getBooksForUser,
  getBookDetailsById,
};