const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// Modelo de Usuario
const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;