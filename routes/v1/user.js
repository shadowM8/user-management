const { createUser, login, getToken } = require('../../actions/user');
const auth = require('../../middlewares/auth');

const userController = {
  signUp: async (req, res) => {
    try {
      const {username, password} = req.body
      const result = await createUser(username, password)
      return res.status(201).json({
        result
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  login: async (req, res) => {
    try {
      const {username, password} = req.body

      const token = await login(username, password)
      return res.status(200).json({
        token
      })
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  },
  token: async (req, res) => {
    try {
      const {key} = req.body
      const token = await getToken(key)
      return res.status(200).json({
        token
      })
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
}

module.exports = (router) => {
  router.post('/register', auth,userController.signUp);
  router.post('/login', userController.login);
  router.post('/getToken', userController.token);
}