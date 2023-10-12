/* eslint-disable no-useless-catch */
const db = require('../../config/db');
const util = require('util');
const queryAsync = util.promisify(db.query);

const getAdminByNameAndPassword = (full_name, password, callback) => {
  try {
    const selectQuery = 'SELECT * FROM admins WHERE full_name = ? AND password = ?';
    db.query(selectQuery, [full_name, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  } catch (error) {
    callback(error, null);
  }
};

module.exports = {
  getAdminByNameAndPassword,
};
