const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userControllers');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/profile', authenticateUser, (req, res) => {
});

module.exports = router;
