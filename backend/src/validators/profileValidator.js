const Joi = require('joi');

const profileSchema = Joi.object({
  full_name: Joi.string().required().messages({
    'any.required': 'Full Name is required'
  }),
  phone_number: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
    'string.pattern.base': 'Phone number must be in the format XXX-XXX-XXXX',
    'any.required': 'Phone Number is required'
  }),
  favorite_number: Joi.number().integer().min(1).max(100).required().messages({
    'number.base': 'Favorite Number must be a number',
    'number.min': 'Favorite Number must be at least 1',
    'number.max': 'Favorite Number must be at most 100',
    'any.required': 'Favorite Number is required'
  }),
  favorite_mammal: Joi.string().required().messages({
    'any.required': 'Favorite Four-Legged Mammal is required'
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required'
  })
});

module.exports = { profileSchema };
