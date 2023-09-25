const userModel = require('../models/user');
const registerUser = (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    userModel.createUser(username, email, password, (err) => {
      if (err) {
        console.error('Error inserting user data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('User registered successfully');
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;
    userModel.getUserByUsernameAndPassword(username, password, (err, results) => {
      if (err) {
        console.error('Error querying user data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'User not found or incorrect password' });
      }
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
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
