const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  street: { type: String, required: true }, 
  city: { type: String, required: true },
  state: { type: String, required: true }, 
  district: { type: String },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }, 
  type: {
    type: String,
    enum: ["billing", "shipping", "home", "work"],
    default: "shipping",
  },
  isPrimary: { type: Boolean, default: false }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

addressSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Address", addressSchema);
