const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }

  const connection = mongoose.connection;

  connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
}

module.exports = connect;
