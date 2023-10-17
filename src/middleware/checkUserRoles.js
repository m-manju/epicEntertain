const adminModel = require('../models/middleware');

const checkUserRole = (allowedRoles) => {
  return (req, res, next) => {
    const { full_name } = req.user;

    console.log(req.user);
    adminModel.getUserRole(full_name, (err, userRole) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (userRole === 0) {
        return res.status(403).json({ error: 'User not found' });
      }
      console.log("userRole:", userRole);
      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ error: 'Permission denied' });
      }
    });
  };
};

module.exports = checkUserRole;
