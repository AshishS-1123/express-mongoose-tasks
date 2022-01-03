const Task = require("../models/task");

async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find({});
    res.status(201).json({ tasks })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

// Controller to create new task.
async function createTask(req, res, next) {
  const { name, completed } = req.body;

  try {
    const task = await Task.create({ name, completed });
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
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
