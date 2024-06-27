const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const profileValidator = require('../validators/profileValidator');

// POST /api/profile - Create a new profile
router.post('/profile', profileValidator.validateProfile, profileController.createProfile);

// GET /api/profile/:userId - Get a profile by userId
router.get('/profile/:userId', profileController.getProfile);

module.exports = router;
