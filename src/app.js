const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db'); 
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/booksRoutes');


const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', booksRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});