/* eslint-disable no-useless-catch */
const db = require('../../config/db');

const getBookDetailsById = async (bookId) => {
  try {
    const selectQuery = 'SELECT * FROM book WHERE id = ?';
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

const addBook = async (name, description, author_id, isbn, publication_year, image_url) => {
  try {
    const insertQuery = `
      INSERT INTO book (name, description, author_id, isbn, publication_year, image_url)
      VALUES (?, ?, ?, ?, ?, ?);`;
    const result = await db.query(insertQuery, [name, description, author_id, isbn, publication_year, image_url]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};
const editBook = async (bookId, name, description, author_id, isbn, publication_year) => {
  try {
    const updateQuery = `UPDATE book
      SET name = ?, description = ?, author_id = ?, isbn = ?, publication_year = ?
      WHERE id = ?`;
    const result = await db.query(updateQuery, [name, description, author_id, isbn, publication_year, bookId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (bookId) => {
  try {
    const deleteQuery = 'DELETE FROM book WHERE id = ?';
    const result = await db.query(deleteQuery, [bookId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
};


const addBookWithFile = async (name, description, author_id, isbn, publication_year, book_file_url) => {
  try {
    const insertQuery = `INSERT INTO book (name, description, author_id, isbn, publication_year, book_file_url)
      VALUES (?, ?, ?, ?, ?, ?);`;
    const result = await db.query(insertQuery, [name, description, author_id, isbn, publication_year, book_file_url]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};


const getBookFileUrlById = async (bookId) => {
  try {
    const selectQuery = `SELECT book_file_url FROM book
      WHERE id = ?;`
    const result = await db.query(selectQuery, [bookId]);
    if (result.length === 0) {
      return null;
    }
    return result[0].book_file_url;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBook,
  editBook,
  deleteBook,
  getBookDetailsById,
  addBookWithFile,
  getBookFileUrlById,
};