/* eslint-disable no-useless-catch */
const db = require('../config/db');



const getBooksForUser = async () => {
  let con;
  try {
    con = await db.getConnection();
    const selectQuery = `SELECT book.id, book.name as 'book name',
      authors.name as 'author name', authors.bio as 'author bio',
      description, isbn, publication_year  
      FROM book JOIN authors ON book.author_id = authors.id;`;
    const rows = await con.query(selectQuery);
    console.log(rows,"helo");
    return rows;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    if (con) {
      con.release(); 
    }
  }
};

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
  } finally {
    if (con) {
      con.release(); 
    }
  }
};

module.exports = {
  getBooksForUser,
  getBookDetailsById,
};
