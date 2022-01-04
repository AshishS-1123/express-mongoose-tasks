const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const CustomError = require("../utils/customError")

const getAllTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await Task.find({});
    res.status(201).json({ tasks })
});

// Controller to create new task.
const createTask = asyncWrapper(async (req, res) => {
  const { name, completed } = req.body;
  const task = await Task.create({ name, completed });
  res.status(201).json({ task, message: "Task Created!" });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });

  if (!task) {
    return next(new CustomError(404, "Task does not exist"));
  }

  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;

  const task = await Task.findOneAndUpdate({ _id: id }, updatedTask, {
    new: true, // always return the updated task
    runValidators: true,
  });

  if (!task) {
    return next(new CustomError(404, "Task does not exist"));
  }

  res.status(200).json({
    message: "Update Successful!",
  })
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return next(new CustomError(404, "Task does not exist"));
  }

  res.status(201).json({ task, message: "Deleted Successfully!" });
})

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
