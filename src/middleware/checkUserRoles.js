const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const db = require('../config/db');

const checkUserRole = (allowedRoles) => {
    return (req, res, next) => {
      const { full_name } = req.user; 
  
      console.log(req.user);
      const query = 'SELECT role_id FROM admins WHERE full_name = ?';
  
      db.query(query, [full_name], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
          return res.status(403).json({ error: 'User not found' });
        }
  
        const userRole = results[0].role_id;
  
        console.log("userRole",userRole)
        if (allowedRoles.includes(userRole)) {
          next();
        } else {
          res.status(403).json({ error: 'Permission denied' });
        }
      });
    };
  };
  

module.exports = checkUserRole;
  


