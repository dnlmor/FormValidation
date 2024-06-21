const express = require('express');
const { validateProfile } = require('../controllers/profileController');

const router = express.Router();

router.post('/validate', validateProfile);

module.exports = router;
