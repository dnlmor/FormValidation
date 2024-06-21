// backend/validations/profileValidations.js

const { body } = require('express-validator');
const PhoneNumber = require('libphonenumber-js');

// Validation rules for each field in the profile form
const profileValidationRules = () => {
  return [
    body('fullName')
      .notEmpty()
      .withMessage('Full Name is required')
      .isString()
      .withMessage('Full Name must be a string'),

    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone Number is required')
      .custom(value => {
        // Validate phone number format using libphonenumber-js
        try {
          const phoneNumberObj = PhoneNumber.parse(value, { defaultCountry: 'US' }); // Example: defaultCountry can be adjusted
          return PhoneNumber.isValidNumber(phoneNumberObj);
        } catch (error) {
          return false;
        }
      })
      .withMessage('Invalid phone number format'),

    body('favoriteNumber')
      .notEmpty()
      .withMessage('Favorite Number is required')
      .isInt({ min: 0, max: 10000 })
      .withMessage('Favorite Number must be an integer between 0 and 10000'),

    body('favoriteMammal')
      .notEmpty()
      .withMessage('Favorite four legged mammal is required')
      .isString()
      .withMessage('Favorite four legged mammal must be a string'),

    body('address')
      .notEmpty()
      .withMessage('Address is required')
      .isString()
      .withMessage('Address must be a string')
  ];
};

module.exports = {
  profileValidationRules
};
