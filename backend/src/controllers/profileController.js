const Joi = require('joi');

const { profileSchema } = require('../validators/profileValidator');

const validateProfile = (req, res) => {
  const { error } = profileSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) });
  }

  res.status(200).json({ message: "Profile data is valid!" });
};

module.exports = { validateProfile };
