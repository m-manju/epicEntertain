const userModel = require('../models/user');
const jwtConfig = require('../config/jwt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, email, password} = req.body;
    if (!username || !email || !password ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    userModel.getUserByUsername(username, (err, existingUser) => {
      if (err) {
        console.error('Error querying signup data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Existing User:', existingUser);
      if (existingUser && existingUser.length > 0) {
        console.log('Username already exists');
        return res.status(400).json({ error: 'Username already exists' });
      }
      userModel.createUser(username, email, password ,(err) => {
        if (err) {
          console.error('Error inserting user data:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('User registered successfully');
        res.status(201).json({success: true, message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    userModel.getUserByUsername(username, async (err, user) => {
      if (err) {
        console.error('Error querying signup data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!user || user.length === 0) {
        console.log('User not found');
        return res.status(401).json({ error: 'User not found' });
      }
      if (user[0].password === password) {
        const tokenUser = { username: user[0].username, email: user[0].email, id: user[0].id };
        const token = jwt.sign(tokenUser, jwtConfig.secretKey, { expiresIn: jwtConfig.expiresIn });
        console.log('Login successful');
        res.json({success: true,
          message: 'Login successful',
          token: token,
        });
      } else {
        console.log('Incorrect password');
        res.status(401).json({ error: 'Incorrect password' });
      }
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({success: false, error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
