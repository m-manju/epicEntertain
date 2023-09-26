const db = require('../config/db');

const createUser = (username, email, password, callback) => {
  const insertQuery = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
  db.query(insertQuery, [username, email, password], (err, results) => {
    if (err) {
      return callback(err);
    }

    callback(null, results);
  });
};

const getUserByUsernameAndPassword = (username, password, callback) => {
  const selectQuery = 'SELECT * FROM signup WHERE username = ? AND password = ?';
  db.query(selectQuery, [username, password], (err, results) => {
    if (err) {
      return callback(err);
    }

    callback(null, results);
  });
};

module.exports = {
  createUser,
  getUserByUsernameAndPassword,
};