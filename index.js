const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); 
const brandRoutes = require("./routes/brandRoutes")
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connect();

// Routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes); 
app.use("/api", brandRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


