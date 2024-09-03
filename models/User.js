const connection = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  create: async (username, password, role, callback) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
      connection.query(query, [username, hashedPassword, role], callback);
    } catch (error) {
      callback(error);
    }
  },

  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?";
    connection.query(query, [username], callback);
  },
};

module.exports = User;
