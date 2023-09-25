// Validation utility functions

// Check if an email is valid
const isValidEmail = (email) => {
    // Implement your email validation logic here
    // Return true if the email is valid; otherwise, return false
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  module.exports = {
    isValidEmail,
    // Add more validation functions as needed
  };
  