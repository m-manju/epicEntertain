const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const db = require('../config/db');


const checkAdminPermission = (req, res, next) => {
    if (req.user.role_id === 1) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };
  
module.exports = checkAdminPermission;

