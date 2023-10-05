const db = require('../config/db');

const createUser = (username, email, password, callback) => {
  try {
    const insertQuery = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, email, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  } catch (error) {
    callback(error, null);
  }
};

const getUserByUsernameAndPassword = (username, password, callback) => {
  try {
    const selectQuery = 'SELECT * FROM signup WHERE username = ? AND password = ?';
    db.query(selectQuery, [username, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  } catch (error) {
    callback(error, null);
  }
};

const getUserByUsername = (username, callback) => {
  try {
    const query = 'SELECT * FROM signup WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = {
  createUser,
  getUserByUsernameAndPassword,
  getUserByUsername,
};
