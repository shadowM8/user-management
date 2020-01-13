module.exports = function(sequelize, DataTypes) {
  return sequelize.define('todo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'username',
				key: 'id'
			},
			field: 'userId'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'due_date'
    },
    // project: {
    //   type: DataTypes.INTEGER,
		// 	allowNull: true,
		// 	references: {
		// 		model: 'project',
		// 		key: 'id'
		// 	},
		// 	field: 'project_id'
    // },
  }, {
    tableName: 'todo',
    createdAt: 'created_at',
		updatedAt: 'updated_at',
    timestamps: true
  })
}