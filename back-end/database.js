// database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite", // O el tipo de base de datos que uses (MySQL, PostgreSQL, etc.)
  storage: "./database.sqlite", // Ruta donde se guardará la base de datos SQLite
});

module.exports = sequelize;
