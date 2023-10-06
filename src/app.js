const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/booksRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes'); 


const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', booksRoutes); 
app.use('/subscriptions', subscriptionRoutes);
app.use('/subscription-plans', subscriptionRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

