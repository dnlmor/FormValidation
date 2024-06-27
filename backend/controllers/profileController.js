const Profile = require('../models/Profile');
const sanitize = require('../utils/sanitize');

exports.createProfile = async (req, res) => {
  try {
    const { fullName, email, password, phone, dateOfBirth, favoriteNumber, favoriteMammal, address } = req.body;

    const profile = new Profile({
      fullName: sanitize.htmlEntityEncode(fullName),
      email,
      password,  // Ensure password hashing if required
      phone: sanitize.jsStringEscape(phone),
      dateOfBirth,
      favoriteNumber,
      favoriteMammal: sanitize.htmlEntityEncode(favoriteMammal),
      address: sanitize.urlEncode(address)
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findById(userId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({
      fullName: sanitize.htmlEntityEncode(profile.fullName),
      email: profile.email,
      phone: sanitize.jsStringEscape(profile.phone),
      dateOfBirth: profile.dateOfBirth,
      favoriteNumber: profile.favoriteNumber,
      favoriteMammal: sanitize.htmlEntityEncode(profile.favoriteMammal),
      address: sanitize.urlEncode(profile.address)
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
