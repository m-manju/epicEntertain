const userModel = require('../models/user');
const jwtConfig = require('../config/jwt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    userModel.getUserByUsername(username, (err, existingUser) => {
      if (err) {
        console.error('Error querying signup data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (existingUser && existingUser.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      userModel.createUser(username, email, password, (err) => {
        if (err) {
          console.error('Error inserting user data:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    userModel.getUserByUsername(username, (err, results) => {
      if (err) {
        console.error('Error querying signup data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'User not found or incorrect password' });
      }

      const user = { username: results[0].username };
      const token = jwt.sign(user, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
      res.json({
        message: 'Login successful',
        token: token,
      });
      console.log('Login successful');
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
