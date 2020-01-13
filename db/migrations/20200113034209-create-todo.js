module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('todo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    // project: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: 'project',
    //     key: 'id',
    //   },
    // },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'username',
        key: 'id',
      },
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }),
  down: queryInterface => queryInterface.dropTable('todo'),
};
