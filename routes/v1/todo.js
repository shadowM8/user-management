const { createTodo, getTodo, deleteTodo } = require('../../actions/todo');

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

  get: async (req, res) => {
    const { query } = req.body;
    try {
      const searchResult = await getTodo(query);
      return res.status(200).json({ searchResult });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  remove: async (req, res) => {
    try {
      req.checkBody({
        todoId: { notEmpty: true, errorMessage: 'todoId is required' },
      });

      const errors = req.validationErrors();
      if (errors) {
        return res.status(400).json({
          err: errors,
        });
      }

      const { todoId } = req.body;
      let message = 'no change';

      const result = await deleteTodo(todoId);
      if (result === 1) message = 'todolist successfuly removed';
      return res.status(200).json({
        message,
        result,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = (router) => {
  router.post('/', todoController.create);
  router.post('/search', todoController.get);
  router.delete('/remove', todoController.remove);
};
