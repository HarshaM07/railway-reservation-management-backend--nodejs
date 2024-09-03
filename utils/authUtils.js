const bcrypt = require("bcryptjs");

/**
 * Compare a plain text password with a hashed password.
 * @param {string} plainPassword - The plain text password.
 * @param {string} hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true if passwords match, otherwise false.
 */
const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (err) {
    throw new Error("Error comparing passwords: " + err.message);
  }
};

module.exports = {
  comparePasswords,
};
