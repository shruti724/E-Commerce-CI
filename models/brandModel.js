const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  brand_front_image: { type: mongoose.Schema.Types.Mixed, default: {} },
  brand_image_gallery: { type: mongoose.Schema.Types.Mixed, default: [] },
  meta_title: { type: String, default: "" },
  meta_description: { type: String, default: "" },
  meta_keywords: { type: String, default: "" },
  is_indexed: { type: Boolean, default: true },
  status: { type: String, default: "active" },
  isDeleted: {type: Boolean, default: false},
   // for soft delete
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
