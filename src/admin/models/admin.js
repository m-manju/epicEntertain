/* eslint-disable no-useless-catch */
const db = require('../../config/db');
const util = require('util');

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

const checkAdminExists = async (full_name) => {
  const selectQuery = 'SELECT * FROM admins WHERE full_name = ?';
  const results = await db.query(selectQuery, [full_name]);
  return results.length > 0;
};

const addAdmin = async (full_name,email, password, role_id) => {
  const insertQuery = 'INSERT INTO admins (full_name, email, password, role_id) VALUES (?, ?, ?,?)';
  const result = await db.query(insertQuery, [ full_name,email, password, role_id]);
  return result.insertId;
};


module.exports = {
  getAdminByNameAndPassword,
  checkAdminExists,
  addAdmin,
};
