const { Op } = require('sequelize');
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

const getTodo = async (searchQuery = {}) => {
  const { id, name, dueDate } = searchQuery;
  try {
    const query = {};
    if (id) {
      query[Op.and] = [{ id }];
    }

    if (name && !id) {
      query[Op.and] = [{ name: { [Op.substring]: name } }];
    }

    if (name && id) {
      query[Op.and] = [...query[Op.and], { name: { [Op.substring]: name } }];
    }

    if (dueDate && !name && !id) {
      query[Op.and] = [{ dueDate: new Date(dueDate) }];
    }

    if ((dueDate && name && !id) || (dueDate && name && id) || (dueDate && !name && id)) {
      query[Op.and] = [...query[Op.and], { dueDate: new Date(dueDate) }];
    }

    const result = await todo.findAll({ where: query });
    return result;
  } catch (error) {
    const err = error.message;
    throw err;
  }
};

const deleteTodo = async (todoId) => {
  try {
    const result = await todo.destroy({ where: { id: todoId } });
    return result;
  } catch (error) {
    const err = error.message;
    throw err;
  }
};

module.exports = {
  createTodo,
  getTodo,
  deleteTodo,
};
