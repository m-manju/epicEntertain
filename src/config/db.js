/* eslint-disable no-empty */

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'manju',
});

const db = pool.promise(); 

module.exports = db;

