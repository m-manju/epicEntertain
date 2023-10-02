const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: 'Token is missing' });
  }

  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(401).json({ error: 'Token is invalid' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
