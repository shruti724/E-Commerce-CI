const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: String,
  },
  { timestamps: true }
); 

module.exports = mongoose.model("Setting", settingSchema);
