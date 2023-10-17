const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/admin');
const {addAdmin}  = require('../controllers/admin');
const verifyToken = require('../../middleware/verifyToken');
// const verifyRole = require('../../middleware/roleAuthentication');
// const verifyAccess = require('../../middleware/checkAdminPermission');
const checkUserRole = require('../../middleware/checkUserRoles');

router.post('/loginAdmin', loginAdmin);

router.post('/add',verifyToken, checkUserRole([3]),  addAdmin);

module.exports = router;

