const { username: usernameModel } = require('../db/models/postgresql');
const { comparePass, encryptPass } = require('../libs/password');
const { jwtSign, jwtVerify } = require('../libs/jwt');
const config = require('../config');
const key = config.get('KEY_MAKER');

const createUser = async (username, password) => {
  try {
    const result = await usernameModel.create({
      username,
      password
    })
    return result
  } catch (error) {
    throw error
  }
}

const login = async (username, password) => {
  try {
    const findUser = await usernameModel.findOne({
      where: {
        username
      }
    })

    if (!findUser) throw new Error('invalid username / password');

    const { 
      username: dbUser,
      password: dbPass,
    } = findUser

    console.log({dbUser, dbPass});

    const checkPassword = comparePass(password, dbPass)

    if (!checkPassword) throw new Error('invalid username / password');

    const forToken = {
      dbUser,
      dbPass
    }

    const token = jwtSign(forToken)

    return token
  } catch (error) {
    throw error
  }
}

const getToken = async (paramkey) => {
  try {
    if (paramkey == '') paramkey = key
    const forToken = {
      paramkey
    }
    const token = jwtSign(forToken)
    return token
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  login,
  getToken
}