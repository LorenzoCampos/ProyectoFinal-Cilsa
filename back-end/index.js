// Archivo: index.js
const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Configuración inicial
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// Modelo de Usuario
const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

// Modelo de Tareas
const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

// Relación: Un usuario tiene muchas tareas
User.hasMany(Task);
Task.belongsTo(User);

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token requerido" });

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
};

// Rutas
// Registro
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username y password son requeridos" });

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({
      message: "Usuario creado",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    res.status(400).json({ error: "El usuario ya existe" });
  }
});

// Inicio de sesión
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Credenciales inválidas" });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );
  res.json({ token });
});

// Crear tarea
app.post("/tasks", authenticateToken, async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "El título es requerido" });

  const task = await Task.create({ title, UserId: req.user.id });
  res.status(201).json(task);
});

// Obtener tareas
app.get("/tasks", authenticateToken, async (req, res) => {
  const tasks = await Task.findAll({ where: { UserId: req.user.id } });
  res.json(tasks);
});

// Actualizar tarea
app.put("/tasks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = await Task.findOne({ where: { id, UserId: req.user.id } });
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  await task.save();
  res.json(task);
});

// Eliminar tarea
app.delete("/tasks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ where: { id, UserId: req.user.id } });
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

  await task.destroy();
  res.status(204).send();
});

// Sincronizar base de datos y arrancar servidor
sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  );
});
