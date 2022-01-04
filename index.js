// Setup environment variables.
// require("dotenv").config({ path: "./config.env" })

// Create a new Express App
const express = require("express");
const app = express();

// Routers
const taskRouter = require("./routes/tasks")
// Middlewares
const notFound = require("./middleware/notFound")
const errorHandler = require("./middleware/errorHandler")

// Database connection
const connectDB = require("./config/configDB")

// Static files
app.use(express.static("./public/"));

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/tasks", taskRouter);

// Not Found Page
app.use(notFound);
// Error Handler
app.use(errorHandler);

// Server
const startServer = async () => {
  try {
    // Try connecting to database before starting server.
    await connectDB();
    console.log("Connected to Database ...")

    // Start to server.
    app.listen(process.env.PORT || 80, () => {
      console.log(`Listen on port ${process.env.PORT} ...`);
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
