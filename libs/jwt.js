const jwt = require('jsonwebtoken');
const config = require('../config');

const secret = config.get('JWT_SECRET')

module.exports = {
  jwtSign: (payload) => {
    try {
      return jwt.sign(payload, secret)
    } catch (error) {
      throw error
    }
  },
  jwtVerify: (token) => {
    try {
      return jwt.verify(token, secret)
    } catch (error) {
      throw error
    }
  }
}