// /* eslint-disable no-useless-catch */

// const db = require('../config/db');
// const util = require('util');
// const queryAsync = util.promisify(db.query).bind(db);


// const createUser = (username, email, password, callback) => {
//   try {
//     const insertQuery = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
//     db.query(insertQuery, [username, email, password], (err, results) => {
//       if (err) {
//         return callback(err, null);
//       }
//       callback(null, results);
//     });
//   } catch (error) {
//     callback(error, null);
//   }
// };

// const getUserByUsernameAndPassword = async (username, password) => {
//   try {
//     const selectQuery = 'SELECT * FROM signup WHERE username = ? AND password = ?';
//     const results = await db.query(selectQuery, [username, password]);
//     return results;
//   } catch (error) {
//     throw error;
//   }
// };

// const getUserByUsername = async (username) => {
//   try {
//     const query = 'SELECT * FROM signup WHERE username = ?';
//     const results = await db.query(query, [username]);
//     return results;
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   createUser,
//   getUserByUsernameAndPassword,
//   getUserByUsername,
// };

/* eslint-disable no-useless-catch */
const db = require('../config/db');
const util = require('util');

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