const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const subscriptionController = require('../controllers/subscription');
const checkAdminPermissions = require('../../middleware/checkPermissions');

router.delete('/deletePlan/:planId', verifyToken, checkAdminPermissions([1]), subscriptionController.deletePlan);

router.post('/createPlan', verifyToken,checkAdminPermissions([1]), subscriptionController.createNewPlan);

module.exports = router;