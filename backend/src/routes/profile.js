const express = require('express');
const { validateProfile } = require('../controllers/profileController');

const router = express.Router();

router.post('/', validateProfile);

module.exports = router;