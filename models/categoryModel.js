const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }, 

  product_front_image: { type: mongoose.Schema.Types.Mixed, default: {} }, 
  product_image_gallery: { type: mongoose.Schema.Types.Mixed, default: [] }, 
  meta_title: { type: String, default: "" },
  meta_description: { type: String, default: "" },
  meta_keywords: { type: String, default: "" },
  is_indexed: { type: Boolean, default: true },
  status: { type: String, default: "active" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
