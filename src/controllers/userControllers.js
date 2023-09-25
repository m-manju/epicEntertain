const pool = require('../config/db');

// User registration route
const registerUser = (req, res) => {
  try {
    const { username, email, password } = req.body;

    const insertQuery = 'INSERT INTO signup (username, email, password) VALUES (?, ?, ?)';
    pool.query(insertQuery, [username, email, password], (err, results) => {
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

// User login route
const loginUser = (req, res) => {
  try {
    const { username, password } = req.body;

    const selectQuery = 'SELECT * FROM signup WHERE username = ? AND password = ?';
    pool.query(selectQuery, [username, password], (err, results) => {
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
