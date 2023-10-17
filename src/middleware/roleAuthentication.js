const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const authModel = require('../models/middleware');

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
    const { full_name } = decoded;

    authModel.getUserRole(full_name, (dbErr, userRole) => {
      if (dbErr) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (userRole === 0) {
        return res.status(403).json({ error: 'User not found' });
      }

      req.user = { userRole };
      next();
    });
  });
};

module.exports = authenticateUser;

