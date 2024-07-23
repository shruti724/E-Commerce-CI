const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }, // Specify your role as Admin othewise by default it will be user.
  status: {
    type: String,
    default: "active",
  },
  profile_image: {
    type: string,
  },
  phone: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  isDeleted: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;