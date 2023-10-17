// const adminsModel = require('../models/middleware');
const userAdmin = require('../admin/models/admin');

const checkAdminPermissions = (requiredPermissions) => {
  return async (req, res, next) => {
    const { admin_id } = req.user;

    try {
      const adminPermissions = await userAdmin.getAdminPermissions(admin_id);
      for (const permissionId of requiredPermissions) {
        if (!adminPermissions.includes(permissionId)) {
          return res.status(403).json({ error: 'Permission denied' });
        }
      }
      next();
    } catch (error) {
      console.error('Error checking admin permissions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};



module.exports = checkAdminPermissions;
