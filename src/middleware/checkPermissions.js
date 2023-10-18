
const userAdmin = require('../admin/models/admin');

const checkAdminPermissions = (requiredPermissions) => {
    return async (req, res, next) => {
      const { full_name } = req.user;
      console.log('Full Name:', full_name); 
      console.log('Permissions needed:', requiredPermissions); 
      try {
        const adminPermissions = await userAdmin.getAdminPermissions(full_name);
        console.log(adminPermissions); 
        for (const permissionId of requiredPermissions) {
          if (!adminPermissions.includes(permissionId)) {
            console.log('Permission Denied');
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
