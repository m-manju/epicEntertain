const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Token is missing' });
  }
  try {
    jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token is invalid' });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = verifyToken;
