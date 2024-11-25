const Task = require("../models/taskModel");

// Crear tarea
const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "El título es requerido" });

  const task = await Task.create({ title, description, UserId: req.user.id });
  res.status(201).json(task);
};

// Obtener tareas
const getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { UserId: req.user.id } });
  res.status(200).json(tasks);
};

// Actualizar tarea
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, completed, description } = req.body;

  const task = await Task.findOne({ where: { id, UserId: req.user.id } });
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  if (description !== undefined) task.description = description;
  await task.save();
  res.status(200).json(task);
};

// Eliminar tarea
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id, UserId: req.user.id } });
  if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

  await task.destroy();
  res.status(204).send();
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
