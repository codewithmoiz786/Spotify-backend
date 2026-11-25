const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ Connected to DB");
  } catch (err) {
    console.log("❌ DB Error:", err.message);
  }
}

module.exports = connectDB;