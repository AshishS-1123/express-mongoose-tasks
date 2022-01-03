require("dotenv").config({path: "./config.env"})
const express = require("express");
const app = express();

const taskRouter = require("./routes/tasks")

const connectDB = require("./config/configDB")

const port = 3000;

// Static files
app.use(express.static("public/"));

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/tasks", taskRouter);

// Server
const startServer = async () => {
  try {
    // Try connecting to database before starting server.
    await connectDB();
    console.log("Connected to Database ...")

    // Start to server.
    app.listen(port, () => {
      console.log(`Listen on port ${port} ...`);
    })
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

startServer();

// app.get("/api/v1/tasks")               - get all tasks
// app.post("/api/v1/tasks")             - create new task
// app.get("/api/v1/tasks/:id")         - get single task
// app.patch("/api/v1/tasks/:id")    - update task
// app.delete("/api/v1/tasks/:id")   - delete task
