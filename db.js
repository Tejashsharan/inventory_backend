const mongoose = require('mongoose');
require('dotenv').config(); // Load .env file

async function connectToMongoose() {
  const DATABASE = process.env.DATABASE;
  if (!DATABASE) {
    console.error('DATABASE environment variable not set.');
    process.exit(1);
  }

  console.log(`Connecting to database: ${DATABASE}`);

  try {
    await mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err.message);
    process.exit(1); // Exit the process with failure
  }
}

module.exports = connectToMongoose;
