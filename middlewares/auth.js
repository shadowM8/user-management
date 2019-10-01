const { jwtVerify } = require('../libs/jwt');

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers
    jwtVerify(token)
    next()
  } catch (error) {
    res.status(401).json(error)
  }
}