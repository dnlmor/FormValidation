const { parsePhoneNumber, isValidPhoneNumber } = require('libphonenumber-js');
const { profileSchema } = require('../validators/profileValidator');

const validateProfile = (req, res) => {
  try {
    // First, validate the overall structure with Joi
    const { error, value } = profileSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    }

    // Additional validation for phone number using libphonenumber-js
    if (!isValidPhoneNumber(value.phone_number)) {
      return res.status(400).json({ errors: ['Invalid phone number format'] });
    }

    try {
      const phoneNumber = parsePhoneNumber(value.phone_number);
      // Format the phone number to E.164 format
      value.phone_number = phoneNumber.format('E.164');
    } catch (err) {
      console.error('Error parsing phone number:', err);
      return res.status(400).json({ errors: ['Unable to parse phone number'] });
    }

    // If all validations pass, you can process the data further here
    return res.status(200).json({ message: "Profile data is valid!", data: value });
  } catch (err) {
    console.error('Unexpected error during profile validation:', err);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

module.exports = { validateProfile };