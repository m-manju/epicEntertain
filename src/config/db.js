/* eslint-disable no-empty */
const mysql = require('mysql2');
const util = require('util');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'manju',
});
const query = util.promisify(con.query).bind(con);

module.exports = {
  con,
  query,
};

