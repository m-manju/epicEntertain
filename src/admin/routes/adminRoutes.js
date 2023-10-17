const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/admin');
const { createAdminWithPermissions } = require('../controllers/admin')
const {addAdmin}  = require('../controllers/admin');
const {updateAdminRolePermissions}  = require('../controllers/admin');
const verifyToken = require('../../middleware/verifyToken');
const verifyRole = require('../../middleware/roleAuthentication');
const verifyAccess = require('../../middleware/checkAdminPermission');
// const checkAdminPermissions = require('../../middleware/checkPermissions');

router.post('/loginAdmin', loginAdmin);

router.post('/add',verifyToken,verifyRole, verifyAccess, addAdmin);

router.post('/create-admin-with-permissions', verifyToken, createAdminWithPermissions);

router.put('/update-role-permissions', verifyToken, updateAdminRolePermissions);


module.exports = router;
