const express = require('express');
const { submitProfile } = require('../controllers/profileController');

const router = express.Router();

// POST route for profile submission
router.post('/submit', submitProfile);

module.exports = router;