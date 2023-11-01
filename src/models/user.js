// /* eslint-disable no-useless-catch */

// const db = require('../config/db');
// const util = require('util');
// const queryFunc = util.promisify(db.query).bind(db); 

// const createUser = async (username, email, password) => {
//   let con;
//   try {
//     con = await db.getConnection();
//     const insertQuery = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
//     const results = await queryFunc(insertQuery, [username, email, password]); 
//     return results;
//   } finally {
//     if (con) {
//       con.release(); 
//     }
//   }
// };

// const getUserByUsernameAndPassword = async (username, password) => {
//   let con;
//   try {
//     con = await db.getConnection();
//     const selectQuery = 'SELECT * FROM signup WHERE username = ? AND password = ?';
//     const results = await queryFunc(selectQuery, [username, password]); 
//     return results;
//   } finally {
//     if (con) {
//       con.release(); 
//     }
//   }
// };

// const getUserByUsername = async (username) => {
//   let con;
//   try {
//     con = await db.getConnection();
//     const selectQuery = 'SELECT * FROM signup WHERE username = ?';
//     const results = await queryFunc(selectQuery, [username]); 
//     return results;
//   } finally {
//     if (con) {
//       con.release(); 
//     }
//   }
// };


// module.exports = {
//   createUser,
//   getUserByUsernameAndPassword,
//   getUserByUsername,
// };
const db = require('../config/db');
const util = require('util');
const queryFunc = util.promisify(db.query).bind(db);

const createUser = (username, email, password, callback) => {
  const insertQuery = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
  queryFunc(insertQuery, [username, email, password], (error, results) => {
    callback(error, results);
  });
};

const getUserByUsernameAndPassword = (username, password, callback) => {
  const selectQuery = 'SELECT * FROM signup WHERE username = ? AND password = ?';
  queryFunc(selectQuery, [username, password], (error, results) => {
    callback(error, results);
  });
};

const getUserByUsername = (username, callback) => {
  const selectQuery = 'SELECT * FROM signup WHERE username = ?';
  queryFunc(selectQuery, [username], (error, results) => {
    callback(error, results);
  });
};

module.exports = {
  createUser,
  getUserByUsernameAndPassword,
  getUserByUsername,
};
