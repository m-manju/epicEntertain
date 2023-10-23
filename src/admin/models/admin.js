/* eslint-disable no-useless-catch */
const db = require('../../config/db');
const util = require('util');


const getAdminByNameAndPassword = async (full_name, password) => {
  let con;
  try {
    con = await db.getConnection();
    const selectQuery = 'SELECT * FROM admins WHERE full_name = ? AND password = ?';
    const [results] = await con.query(selectQuery, [full_name, password]);
    return results;
  } catch (error) {
    console.log('Error retrieving data:', error);
    throw error;
  } finally {
    if (con) {
      con.release(); 
    }
  }
};

const checkAdminExists = async (full_name) => {
  let con;
  try {
    con = await db.getConnection();
    const selectQuery = 'SELECT * FROM admins WHERE full_name = ?';
    const results = await con.query(selectQuery, [full_name]);
    return results.length > 0;
  } catch (error) {
    throw error;
  } finally {
    if (con) {
      con.release();
    }
  }
};

const createAdmin = async (full_name, email, password) => {
  let con;
  try {
    con = await db.getConnection();
    const insertAdminQuery = 'INSERT INTO admins (full_name, email, password) VALUES (?, ?, ?)';
    const adminInsertResult = await con.query(insertAdminQuery, [full_name, email, password]);
    return adminInsertResult.insertId;
  } catch (error) {
    throw error;
  } finally {
    if (con) {
      con.release();
    }
  }
};

const assignPermissions = async (adminId, permissions) => {
  let con;
  try {
    con = await db.getConnection();
    const insertPermissionQuery = 'INSERT INTO admin_permissions (admin_id, permission_id) VALUES (?, ?)';
    for (const permissionId of permissions) {
      await con.query(insertPermissionQuery, [adminId, permissionId]);
    }
  } catch (error) {
    throw error;
  } finally {
    if (con) {
      con.release();
    }
  }
};

const getAdminPermissions = async (full_name) => {
  let con;
  try {
    con = await db.getConnection();
    const selectQuery = 
    `SELECT ap.permission_id FROM admin_permissions AS ap
      INNER JOIN admins AS a ON ap.admin_id = a.id
      WHERE a.full_name = ?`;
    const [rows] = await con.query(selectQuery, [full_name]);
    return rows.map((row) => row.permission_id);
  } catch (error) {
    throw error;
  } finally {
    if (con) {
      con.release();
    }
  }
};


module.exports = {
  getAdminByNameAndPassword,
  checkAdminExists,
  createAdmin,
  assignPermissions,
  getAdminPermissions,
};
