function getAllTasks(req, res, next) {
  res.end("in ger all tasks");
}

function createTask(req, res, next) {
  res.end("create task");
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
