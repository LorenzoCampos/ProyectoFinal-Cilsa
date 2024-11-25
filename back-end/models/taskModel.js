const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./userModel");

// Modelo de Tareas
const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  description: { type: DataTypes.STRING, allowNull: true },
});

// Relación: un usuario tiene muchas tareas
User.hasMany(Task);
Task.belongsTo(User);

module.exports = Task;
