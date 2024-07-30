const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  parent_id: { type: Schema.Types.ObjectId, ref: "Category" },
  product_front_image: String,
  product_image_gallery: [String],
  meta_title: String,
  meta_description: String,
  meta_keywords: String,
  is_indexed: { type: Boolean, default: true },
  status: String,
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Category", categorySchema);
