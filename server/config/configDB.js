const mongoose = require("mongoose");

console.log("in config");
const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    console.log("Error: ", error.message);
  }

  console.log("Connected to MongoDB ...");
}

module.exports = connectDB;
