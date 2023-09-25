const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userControllers');
const { authenticateUser } = require('../middleware/authMiddleware');


// User registration route
router.post('/signup', registerUser);

// User login route
router.post('/login', loginUser);

// Protected route that requires authentication
router.get('/profile', authenticateUser, (req, res) => {
  // Implementation of profile route logic
});

module.exports = router;
