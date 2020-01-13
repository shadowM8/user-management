const { username: usernameModel } = require('../db/models/postgresql');
const { comparePass } = require('../libs/password');
const { jwtSign } = require('../libs/jwt');
const config = require('../config');

const key = config.get('KEY_MAKER');
const shortcut = config.get('SHORTCUT');

const createUser = async (username, password) => {
  try {
    const result = await usernameModel.create({
      username,
      password,
    });
    return result;
  } catch (error) {
    const err = error.message;
    throw err;
  }
};

const login = async (username, password) => {
  try {
    const findUser = await usernameModel.findOne({
      where: {
        username,
      },
    });

    if (!findUser) throw new Error('invalid username / password');

    const {
      username: dbUser,
      password: dbPass,
    } = findUser;

    const checkPassword = comparePass(password, dbPass);

    if (!checkPassword) throw new Error('invalid username / password');

    const forToken = {
      dbUser,
      dbPass,
    };

    const token = jwtSign(forToken);

    return token;
  } catch (error) {
    const err = error.message;
    throw err;
  }
};

const getToken = async (paramkey) => {
  try {
    // eslint-disable-next-line no-param-reassign
    if (paramkey === shortcut) paramkey = key;
    const forToken = {
      paramkey,
    };
    const token = jwtSign(forToken);
    return token;
  } catch (error) {
    const err = error.message;
    throw err;
  }
};

module.exports = {
  createUser,
  login,
  getToken,
};
