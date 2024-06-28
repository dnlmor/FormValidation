const express = require('express');
const { submitProfile, getProfiles } = require('../controllers/profileController');

const router = express.Router();

// POST route for profile submission
router.get('/submissions', getProfiles);
router.post('/submit', submitProfile);

module.exports = router;
