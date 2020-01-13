const { todo } = require('../db/models/postgresql');

const createTodo = async (todoData) => {
  try {
    const result = await todo.create(todoData);
    return result;
  } catch (error) {
    const err = error.message;
    throw err;
  }
};

const getTodo = async (searchQuery) => {
  const { id, name, dueDate } = searchQuery;
  try {
    let query = {};
    if (id) query = { where: { id } };
    if (name) query.where.name = name;
    if (dueDate) query.where.dueDate = dueDate;
    const result = await todo.findAll(query);
    return result;
  } catch (error) {
    const err = error.message;
    throw err;
  }
};

module.exports = {
  createTodo,
  getTodo,
};
