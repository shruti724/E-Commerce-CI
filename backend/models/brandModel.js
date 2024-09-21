const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
   brand_front_image: {
    type: {
      type: String, 
      
    },
    alt: { type: String,  }, 
    path: { type: String,  } 
  },
  brand_image_gallery: [{
    type: {
      type: String, // image type (e.g., 'jpeg', 'png')
      
    },
    alt: { type: String,  }, // alt text
    path: { type: String, } // file path
  }],
  meta_title: String,
  meta_description: String,
  meta_keywords: String,
  is_indexed: { type: Boolean, default: true },
  status: String,
  isDeleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

brandSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Brand", brandSchema);
