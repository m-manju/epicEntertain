const userAdmin = require('../models/admin');
const jwtConfig = require('../../config/jwt');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  try {
    const { full_name, password } = req.body;
    userAdmin.getAdminByNameAndPassword(full_name, password, (err, results) => {
      if (err) {
        console.error('Error querying signup data:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: 'User not found or incorrect password' });
      }
      const user = { full_name: results[0].full_name };
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


const addAdmin = async (req, res) => {
  try {

    const { full_name,email, password } = req.body;
    const adminExists = await userAdmin.checkAdminExists(full_name);

    if (adminExists) {
      return res.status(400).json({ error: 'Admin with the same name already exists' });
    }
    const result = await userAdmin.addAdmin( full_name,email, password, 2);
    if (result) {
      console.log('New admin added successfully');
      res.status(201).json({ message: 'New admin added successfully' });
    }
  } catch (error) {
    console.error('Error adding new admin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addAdmin,
};



module.exports = {
  loginAdmin,
  addAdmin
};
