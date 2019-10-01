const bcrypt = require('bcrypt');
const saltRound = 10

module.exports = {
  encryptPass: (pass) => {
    return bcrypt.hashSync(pass, saltRound)
  },
  comparePass: (pass, dbPass) => {
    return bcrypt.compareSync(pass, dbPass)
  }
}