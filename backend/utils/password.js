const bcrypt = require("bcryptjs");
const saltRound = 10;

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRound);
  } catch (err) {
    console.log(err.message);
  }
};

const validatePassword = async (password, hashPass) => {
  try {
    return await bcrypt.compare(password, hashPass);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { hashPassword, validatePassword };
