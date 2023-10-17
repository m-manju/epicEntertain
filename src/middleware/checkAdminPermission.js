
const checkAdminPermission = (req, res, next) => {
    if (req.user.role_id === 1) {
      return next();
    } else {
      return res.status(403).json({ error: 'Access denied' });
    }
  };

module.exports = checkAdminPermission;


