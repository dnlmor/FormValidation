// utils/sanitize.js

// Function to sanitize full name (remove extra spaces)
const sanitizeFullName = (fullName) => {
    if (typeof fullName !== 'string') return '';
    return fullName.trim().replace(/\s+/g, ' '); // Trim and remove extra spaces
  };
  
  // Function to sanitize phone number (remove non-numeric characters)
  const sanitizePhoneNumber = (phoneNumber) => {
    if (typeof phoneNumber !== 'string') return '';
    return phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
  };
  
  // Function to sanitize favorite mammal (convert to lowercase)
  const sanitizeFavoriteMammal = (favoriteMammal) => {
    if (typeof favoriteMammal !== 'string') return '';
    return favoriteMammal.toLowerCase(); // Convert to lowercase
  };
  
  // Exporting all sanitization functions
  module.exports = {
    sanitizeFullName,
    sanitizePhoneNumber,
    sanitizeFavoriteMammal
  };
  