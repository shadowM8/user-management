module.exports = (sequelize, pathFile) => {
  const todo = sequelize.import(pathFile);
  todo.associate = (models) => {
      models.todo.belongsTo(models.username, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
  }
return todo;
};