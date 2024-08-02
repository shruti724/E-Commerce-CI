const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for products
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
  product_front_image: {
    type: {
      type: String, 
    },
    alt: { type: String, }, 
    path: { type: String, }, 
  },
  product_image_gallery: [
    {
      type: {
        type: String, 
       
      },
      alt: { type: String,  }, 
      path: { type: String,  }, 
    },
  ],
  meta_title: String,
  meta_description: String,
  meta_keywords: String,
  discount_on_product: { type: Number },
  discount_type: { type: String, enum: ["flat", "percentage"] },
  discounted_price: { type: Number },
  is_indexed: { type: Boolean, default: true },
  is_in_stock: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: false },
  status: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Update the updated_at field before saving
productSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
