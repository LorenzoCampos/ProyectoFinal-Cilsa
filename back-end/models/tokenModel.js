const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// Modelo para almacenar tokens válidos
const Token = sequelize.define("Token", {
  token: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Token;
