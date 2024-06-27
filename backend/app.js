const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', profileRoutes);

// Database connection
const dbURI = 'mongodb://localhost:27017/profileDB';
mongoose.connect(dbURI, {})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
