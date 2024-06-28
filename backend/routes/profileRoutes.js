const express = require('express');
const { submitProfile, getProfiles } = require('../controllers/profileController');

const router = express.Router();

// POST route for profile submission
router.post('/submit', submitProfile);

module.exports = router;
