const bcrypt = require("bcryptjs");

const password = "root123"; // The plain text password you want to hash

bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log("Hashed Password:", hashedPassword);
});
