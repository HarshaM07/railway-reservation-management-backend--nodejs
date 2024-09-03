const bcrypt = require('bcryptjs');

const testPassword = 'root123'; // Password you registered with
const hashedPassword = '$2a$10$4OdEG4lp3p6W7OJNzLKSve8hDSbLROvqkXvRfK1sevvplqWFreRJK '; // Password from DB

bcrypt.compare(testPassword, hashedPassword, (err, isMatch) => {
  if (err) throw err;
  console.log('Password match:', isMatch);
});
