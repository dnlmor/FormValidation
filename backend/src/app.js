const express = require('express');
const cors = require('cors');
const profileRoutes = require('./routes/profile');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/profile', profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;