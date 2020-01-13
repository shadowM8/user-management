/* eslint-disable consistent-return */
const { jwtVerify } = require('../libs/jwt');
const config = require('../config');

const passKey = config.get('KEY_MAKER');

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers;
    const verified = jwtVerify(token);
    if (verified.paramkey === passKey) {
      next();
    } else {
      throw new Error('invalid authentication');
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
