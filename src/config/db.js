/* eslint-disable no-empty */

// const mysql = require('mysql2');
// const util = require('util');

// const cont = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'manju',
// });
// const query = util.promisify(cont.query).bind(cont);

// module.exports = {
//   cont,
//   query,
// };

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'manju',
  connectionLimit: 10, 
});

const db = pool.promise(); 

module.exports = db;

