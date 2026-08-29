const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
    process.exit(1); // Exit process with failure if DB connection fails
  }
};

module.exports = connectDB;