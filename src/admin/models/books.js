/* eslint-disable no-useless-catch */
const db = require('../../config/db');


const getBookDetailsById = async (bookId) => {
  let con;
  try {
    con = await db.getConnection();
    const selectQuery = 'SELECT * FROM book WHERE id = ?';
    const results = await con.query(selectQuery, [bookId]);
    if (results.length === 0) {
      return null;
    } else {
      return results[0];
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }finally {
    if (con) {
      con.release(); 
    }
  }
};

const addBook = async (name, description, author_id, isbn, publication_year, image_url) => {
  let con;
  try {
    con = await db.getConnection();
    const insertQuery = `INSERT INTO book (name, description, author_id, isbn, publication_year, image_url)
      VALUES (?, ?, ?, ?, ?, ?);`;
    const result = await con.query(insertQuery, [name, description, author_id, isbn, publication_year, image_url]);
    return result.insertId;
  } catch (error) {
    throw error;
  }finally {
    if (con) {
      con.release(); 
    }
  }
};

const editBook = async (bookId, name, description, author_id, isbn, publication_year) => {
  let con;
  try {
    con = await db.getConnection();
    const updateQuery = `UPDATE book
      SET name = ?, description = ?, author_id = ?, isbn = ?, publication_year = ?
      WHERE id = ?`;
    const result = await con.query(updateQuery, [name, description, author_id, isbn, publication_year, bookId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }finally {
    if (con) {
      con.release(); 
    }
  }
};

const deleteBook = async (bookId) => {
  let con;
  try {
    con = await db.getConnection();
    const deleteQuery = 'DELETE FROM book WHERE id = ?';
    const result = await con.query(deleteQuery, [bookId]);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }finally {
    if (con) {
      con.release(); 
    }
  }
};


const addBookWithFile = async (name, description, author_id, isbn, publication_year, book_file_url) => {
  let con;
  try {
    con = await db.getConnection();
    const insertQuery = `INSERT INTO book (name, description, author_id, isbn, publication_year, book_file_url)
      VALUES (?, ?, ?, ?, ?, ?);`;
    const result = await con.query(insertQuery, [name, description, author_id, isbn, publication_year, book_file_url]);
    return result.insertId;
  } catch (error) {
    throw error;
  }finally {
    if (con) {
      con.release(); 
    }
  }
};


const getBookFileUrlById = async (bookId) => {
  let con;
  try {
    con = await db.getConnection();
    const selectQuery = `SELECT book_file_url FROM book WHERE id = ?;`
    const result = await con.query(selectQuery, [bookId]);
    if (result.length === 0) {
      return null;
    }
    return result[0].book_file_url;
  } catch (error) {
    throw error;
  }finally {
    if (con) {
      con.release(); 
    }
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
