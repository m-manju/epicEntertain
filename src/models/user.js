/* eslint-disable no-useless-catch */

const db = require('../config/db');
const util = require('util');
const query = util.promisify(db.query).bind(db);

const createUser = async (username, email, password) => {
  try {
    const insertQuery = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
    const results = await query(insertQuery, [username, email, password]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getUserByUsernameAndPassword = async (username, password) => {
  try {
    const selectQuery = 'SELECT * FROM signup WHERE username = ? AND password = ?';
    const results = await query(selectQuery, [username, password]);
    return results;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const query = 'SELECT * FROM signup WHERE username = ?';
    const results = await query(query, [username]);
    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByUsernameAndPassword,
  getUserByUsername,
};
