const { createTodo } = require('../../actions/todo');

const todoController = {
  create: async (req, res) => {
    try {
      req.checkBody({
        name: { notEmpty: true, errorMessage: 'name is required' },
        dueDate: { notEmpty: true, errorMessage: 'dueDate is required' },
        userId: { notEmpty: true, errorMessage: 'userId is required' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(400).json({
          err: errors,
        });
      }

      const result = await createTodo(req.body);
      return res.status(201).json({
        result,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = (router) => {
  router.post('/', todoController.create);
};
