const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const authController = {
  register: async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ error: "Username, password, and role are required" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create(username, hashedPassword, role, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    try {
      User.findByUsername(username, async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0)
          return res.status(401).json({ error: "Invalid credentials" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
          return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user.id);
        res.json({ token });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = authController;
