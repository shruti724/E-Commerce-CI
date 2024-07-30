const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); 
const brandRoutes = require("./routes/brandRoutes")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const wishlistRoutes = require("./routes/wishlistRoutes")

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connect();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Routes
app.use("/api", userRoutes);
app.use("/api", categoryRoutes); 
app.use("/api", brandRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", wishlistRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


