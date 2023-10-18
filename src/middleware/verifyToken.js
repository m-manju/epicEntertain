const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ error: 'Token is missing' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ error: 'Token is invalid' });
  }
};

module.exports = verifyToken;
