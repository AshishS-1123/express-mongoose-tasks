require("dotenv").config({path: "./config.env"})
const express = require("express");
const app = express();

const taskRouter = require("./routes/tasks")

const connectDB = require("./config/configDB")
connectDB();

const port = 3000;

// Static files
app.use(express.static("public/"));

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/tasks", taskRouter);

// Server
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
})

// app.get("/api/v1/tasks")               - get all tasks
// app.post("/api/v1/tasks")             - create new task
// app.get("/api/v1/tasks/:id")         - get single task
// app.patch("/api/v1/tasks/:id")    - update task
// app.delete("/api/v1/tasks/:id")   - delete task
