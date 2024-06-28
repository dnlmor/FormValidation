const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 3001; // Use 3001 to avoid conflict with React's default port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
