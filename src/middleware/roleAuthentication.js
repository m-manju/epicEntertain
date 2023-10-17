const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const db = require('../config/db');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token is invalid' });
    }
    const { full_name } = decoded;
    const query = 'SELECT role_id FROM admins WHERE full_name = ?';
    db.query(query, [full_name], (dbErr, results) => {
      if (dbErr) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(403).json({ error: 'User not found' });
      }
      const { role_id } = results[0];
      req.user = { full_name, role_id };
      console.log(req.user);
      next();
    });
  });
};

module.exports = authenticateUser;

