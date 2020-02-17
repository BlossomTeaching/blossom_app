const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const hashPassword = text => bcrypt.hashSync(text, salt);
const checkedHashed = bcrypt.compareSync;

module.exports = {
  hashPassword,
  checkedHashed
};
