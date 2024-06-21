const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const profileRoutes = require('./routes/profile');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
