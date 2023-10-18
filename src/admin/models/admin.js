/* eslint-disable no-useless-catch */
const { log } = require('console');
const db = require('../../config/db');
const util = require('util');

const getAdminByNameAndPassword = async (full_name, password) => {
  return new Promise((resolve, reject) => {
    const selectQuery = 'SELECT * FROM admins WHERE full_name = ? AND password = ?';
    db.query(selectQuery, [full_name, password], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const checkAdminExists = async (full_name) => {
  try {
    const selectQuery = 'SELECT * FROM admins WHERE full_name = ?';
    const results = await db.query(selectQuery, [full_name]);
    return results.length > 0;
  } catch (error) {
    throw error;
  }
};

const createAdmin = async (full_name, email, password) => {
  try {
    const insertAdminQuery = 'INSERT INTO admins (full_name, email, password) VALUES (?, ?, ?)';
    const adminInsertResult = await db.query(insertAdminQuery, [full_name, email, password]);
    return adminInsertResult.insertId;
  } catch (error) {
    throw error;
  }
};

const assignPermissions = async (adminId, permissions) => {
  try {
    const insertPermissionQuery = 'INSERT INTO admin_permissions (admin_id, permission_id) VALUES (?, ?)';
    for (const permissionId of permissions) {
      await db.query(insertPermissionQuery, [adminId, permissionId]);
    }
  } catch (error) {
    throw error;
  }
};


const getAdminPermissions = async (full_name) => {
  try {
    const selectQuery = 
  `SELECT ap.permission_id
    FROM admin_permissions AS ap
    INNER JOIN admins AS a ON ap.admin_id = a.id
    WHERE a.full_name = ?`;
    const rows = await db.query(selectQuery, [full_name]);
    console.log("rows:",rows[1] ,"ddd");
    if (Array.isArray(rows)) {
      return rows.map((row) => row.permission_id);
    } else {
      return []; 
    }
  } catch (error) {
    throw error;
  }
};


module.exports = {
  getAdminByNameAndPassword,
  checkAdminExists,
  createAdmin,
  assignPermissions,
  getAdminPermissions,
};
