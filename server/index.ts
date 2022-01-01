require("dotenv").config({ path: "./config.env" });

import * as express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middlewares.
app.use(express.json());

// Routes.

// Start Server.
app.listen(PORT, () => {
  console.log(`> Server started on port ${PORT}`);
});
