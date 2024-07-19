const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connect();

// Routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


