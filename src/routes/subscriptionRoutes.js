const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const subscriptionController = require('../controllers/subscription');

router.get('/plans',verifyToken,  subscriptionController.getAvailableSubscriptions);

router.post('/updates', verifyToken, subscriptionController.updateUserSubscription);

router.get('/active/:userId', verifyToken, subscriptionController.getActiveSubscription);

module.exports = router;


