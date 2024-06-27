const { body, validationResult } = require('express-validator');

exports.validateProfile = [
  body('fullName').notEmpty().withMessage('Full Name is required').isString().withMessage('Full Name must be a string'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required').isString().withMessage('Password must be a string'),
  body('phone').notEmpty().withMessage('Phone Number is required').isString().isLength({ min: 10, max: 10 }).withMessage('Phone Number must be 10 digits'),
  body('dateOfBirth').notEmpty().withMessage('Date of Birth is required').isISO8601().toDate(),
  body('favoriteNumber').notEmpty().withMessage('Favorite Number is required').isInt({ min: 1, max: 10000 }).withMessage('Favorite Number must be between 1 and 10000'),
  body('favoriteMammal').notEmpty().withMessage('Favorite Mammal is required').isString().withMessage('Favorite Mammal must be a string'),
  body('address').notEmpty().withMessage('Address is required').isString().withMessage('Address must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
