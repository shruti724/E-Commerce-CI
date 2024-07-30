const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  short_description: String,
  description: String,
  price: { type: Number, required: true },
  categories: [
    { type: Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  brand_id: { type: Schema.Types.ObjectId, ref: "Brand" },
  images: [String],
  image_gallery: [String],
  meta_title: String,
  meta_description: String,
  meta_keywords: String,
  is_indexed: { type: Boolean, default: true },
  is_in_stock: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: false },
  status: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

productSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
