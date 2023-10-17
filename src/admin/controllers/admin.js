const userAdmin = require('../models/admin');
const jwtConfig = require('../../config/jwt');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  try {
    const { full_name, password } = req.body;
    userAdmin.getAdminByNameAndPassword(full_name, password, (err, results) => {
      if (err) {
        console.error('Error querying signup data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'User not found or incorrect password' });
      }
      const user = { full_name: results[0].full_name };
      const token = jwt.sign(user, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
      res.json({
        message: 'Login successful',
        token: token,
      });
      console.log('Login successful');
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addAdmin = async (req, res) => {
  try {
    const { full_name,email, password } = req.body;
    console.log(req.body);
    const adminExists = await userAdmin.checkAdminExists(full_name);
    if (adminExists) {
      return res.status(400).json({ error: 'Admin with the same name already exists' });
    }
    const result = await userAdmin.addAdmin( full_name,email, password);
    if (result) {
      console.log('New admin added successfully');
      res.status(201).json({ message: 'New admin added successfully' });
    }
  } catch (error) {
    console.error('Error adding new admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const createAdminWithPermissions = async (req, res) => {
  const { full_name, email, password, permissions } = req.body;

  try {
    const adminId = await userAdmin.createAdmin(full_name, email, password);
    await userAdmin.assignPermissions(adminId, permissions);

    res.status(201).json({ message: 'Admin created with permissions.' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAdminRolePermissions = async (req, res) => {
  const { adminId, permissionId } = req.body;
  try {
    const updated = await userAdmin.updateAdminRolePermissions(adminId, permissionId);

    if (updated) {
      res.status(200).json({ message: 'Admin role permissions updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update admin role permissions' });
    }
  } catch (error) {
    console.error('Error updating admin role permissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  loginAdmin,
  addAdmin,
  createAdminWithPermissions,
  updateAdminRolePermissions,
};

