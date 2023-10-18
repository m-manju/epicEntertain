const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/admin');
const { createAdminWithPermissions } = require('../controllers/admin')
const {updateAdminRolePermissions}  = require('../controllers/admin');
const verifyToken = require('../../middleware/verifyToken');
const checkAdminPermissions = require('../../middleware/checkPermissions');

router.post('/loginAdmin', loginAdmin);

router.post('/create-admin-with-permissions', verifyToken,checkAdminPermissions([1]), createAdminWithPermissions);

router.put('/update-role-permissions', verifyToken,checkAdminPermissions([1]), updateAdminRolePermissions);


module.exports = router;
