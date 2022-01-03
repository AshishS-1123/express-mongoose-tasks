const Task = require("../models/task");

function getAllTasks(req, res, next) {
  res.end("in ger all tasks");
}

// Controller to create new task.
async function createTask(req, res, next) {
  const { name, completed } = req.body;
  const task = await Task.create({ name, completed });
  res.status(201).json({ task });
}

function getTask(req, res, next) {
  res.end("get task");
}

function updateTask(req, res, next) {
  res.end("update task");
}

function deleteTask(req, res, next) {
  res.end("delete task");
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
