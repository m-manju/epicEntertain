/* eslint-disable no-useless-catch */
const db = require('../config/db');

const getBooksForUser = async () => {
  try {
    const selectQuery = `
      SELECT books.id, books.name as 'book name',
      authors.name as 'author name', authors.bio as 'author bio',
      description, isbn, publication_year  
      FROM books
      JOIN authors ON books.author_id = authors.id;`;
    const rows = await db.query(selectQuery);
    console.log(rows,"helo");
    return rows;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


const getBookDetailsById = async (bookId) => {
  try {
    const selectQuery = 'SELECT * FROM books WHERE id = ?';
    const results = await db.query(selectQuery, [bookId]);
    if (results.length === 0) {
      return null;
    } else {
      return results[0];
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


const addBook = async (name, description, author_id, isbn, publication_year, imageUrl) => {
  try {
    const insertQuery = `
      INSERT INTO book (name, description, author_id, isbn, publication_year, image_url)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const result = await db.query(insertQuery, [name, description, author_id, isbn, publication_year, imageUrl]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getBooksForUser,
  getBookDetailsById,
  addBook,
};
