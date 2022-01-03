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

async function getTask(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({
        message: "Task does not exist",
      })
    }

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const updatedTask = req.body;

    const task = await Task.findOneAndUpdate({ _id: id }, updatedTask, {
      new: true, // always return the updated task
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task does not exists",
      });
    }

    res.status(200).json({
      message: "Update Successful !",
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res.status(404).json({
        message: "Task does not exist",
      })
    }

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
