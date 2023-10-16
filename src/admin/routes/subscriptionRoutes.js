const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const verifyRole = require('../../middleware/roleAuthentication');
const verifyAccess = require('../../middleware/checkAdminPermission');
const subscriptionController = require('../controllers/subscription');

router.delete('/delete-plan/:planId', verifyToken, verifyRole, verifyAccess, subscriptionController.deletePlan);

router.post('/create-plan', verifyToken, subscriptionController.createNewPlan);

module.exports = router;
