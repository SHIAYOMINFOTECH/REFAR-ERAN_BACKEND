const generateReferralCode = (name = '') => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const initials = name.substring(0, 2).toUpperCase();
    return initials + random;
  };
  
  module.exports = generateReferralCode;
  