/* eslint-disable no-useless-catch */
const db = require('../../config/db');
const util = require('util');

const getAdminByNameAndPassword = (full_name, password, callback) => {
  try {
    const selectQuery = 'SELECT * FROM admins WHERE full_name = ? AND password = ?';
    db.query(selectQuery, [full_name, password], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  } catch (error) {
    callback(error, null);
  }
};

const checkAdminExists = async (full_name) => {
  const selectQuery = 'SELECT * FROM admins WHERE full_name = ?';
  const results = await db.query(selectQuery, [full_name]);
  return results.length > 0;
};

const addAdmin = async (full_name,email, password) => {
  const insertQuery = 'INSERT INTO admins (full_name, email, password) VALUES (?, ?, ?,?)';
  const result = await db.query(insertQuery, [ full_name,email, password]);
  return result.insertId;
};

const createAdmin = async (full_name, email, password) => {
  const insertAdminQuery = 'INSERT INTO admins (full_name, email, password) VALUES (?, ?, ?)';
  const adminInsertResult = await db.query(insertAdminQuery, [full_name, email, password]);
  return adminInsertResult.insertId;
};

const assignPermissions = async (adminId, permissions) => {
  const insertPermissionQuery = 'INSERT INTO admin_permissions (admin_id, permission_id) VALUES (?, ?)';
  for (const permissionId of permissions) {
    await db.query(insertPermissionQuery, [adminId, permissionId]);
  }
};

const getAdminPermissions = async (admin_id) => {
  const selectQuery = 'SELECT permission_id FROM admin_permissions WHERE admin_id = ?';
  const results = await db.query(selectQuery, [admin_id]);
  console.log(results)
  return results.map((row) => row.permission_id);
};


const updateAdminRolePermissions = async (adminId, permissions) => {
  try {
    await db.query('DELETE FROM admin_permissions WHERE admin_id = ?', [adminId]);
    const insertQuery = 'INSERT INTO admin_permissions (admin_Id, permission_id) VALUES (?, ?)';
    for (const permissionId of permissions) {
      await db.query(insertQuery, [adminId, permissionId]);
    }
    return true; 
  } catch (error) {
    console.error('Error updating admin role permissions:', error);
    return false; 
  }
};


module.exports = {
  getAdminByNameAndPassword,
  checkAdminExists,
  addAdmin,
  createAdmin,
  assignPermissions,
  getAdminPermissions,
  updateAdminRolePermissions,
};
