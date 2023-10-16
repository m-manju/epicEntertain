const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const booksRoutes = require('./routes/booksRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes'); 
const adminRoutes = require('./admin/routes/adminRoutes');
const adminBooksRoutes = require('./admin/routes/booksRoutes');
const adminSubscriptionRoutes = require('./admin/routes/subscriptionRoutes');

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/books', booksRoutes); 
app.use('/subscriptions', subscriptionRoutes);
app.use('/subscription-plans', subscriptionRoutes);

app.use('/admin', adminRoutes);
app.use('/adminBooks', adminBooksRoutes); 
app.use('/adminSubscriptions', adminSubscriptionRoutes); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});