const Profile = require('../models/Profile');

const Profile = require('../models/Profile');
const submitProfile = async (req, res) => {
  try {
    console.log('Received profile data:', req.body);
const submitProfile = async (req, res) => {
  try {
    console.log('Received profile data:', req.body);

    const newProfile = new Profile(req.body);
    await newProfile.save();

    res.status(200).json({ message: 'Profile submitted successfully', data: req.body });
  } catch (error) {
    console.error('Error submitting profile:', error);
    res.status(500).json({ message: 'An error occurred while submitting the profile' });
  }
};
  }
};

module.exports = { submitProfile };
