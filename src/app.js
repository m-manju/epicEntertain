const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db'); // Import the connection pool
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define your routes here
app.use('/auth', authRoutes); // Example route prefix

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
