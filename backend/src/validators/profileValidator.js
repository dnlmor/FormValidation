const Joi = require('joi');

const profileSchema = Joi.object({
  full_name: Joi.string().required().messages({
    'string.base': 'Full name must be a string',
    'any.required': 'Full name is required'
  }),
  
  phone_number: Joi.string().pattern(/^\d{10}$/).required().messages({
    'string.pattern.base': 'Phone number must be 10 digits',
    'any.required': 'Phone number is required'
  }),
  
  favorite_number: Joi.number().integer().min(1).max(100).required().messages({
    'number.base': 'Favorite number must be a number',
    'number.integer': 'Favorite number must be an integer',
    'number.min': 'Favorite number must be at least 1',
    'number.max': 'Favorite number must be at most 100',
    'any.required': 'Favorite number is required'
  }),
  
  favorite_mammal: Joi.string().required().messages({
    'string.base': 'Favorite mammal must be a string',
    'any.required': 'Favorite mammal is required'
  }),
  
  address: Joi.string().required().messages({
    'string.base': 'Address must be a string',
    'any.required': 'Address is required'
  })
});

module.exports = { profileSchema };