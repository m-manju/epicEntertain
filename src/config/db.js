// /* eslint-disable no-empty */

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'manjum',
// });

// const db = pool.promise(); 

// module.exports = db;

const mysql = require('mysql');
const util = require('util');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'manjum',
});

const query = util.promisify(con.query).bind(con);

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = {
  con,
  query,
};