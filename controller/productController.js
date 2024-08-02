const Product = require("../models/productModel");
const slugify = require("slugify");
const path = require("path");

// Get all products
const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total: totalProducts,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(400)
      .json({ success: false, message: "Error fetching products" });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(400).json({ success: false, message: "Error fetching product" });
  }
};

// Generate unique slug
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true });
  let uniqueSlug = slug;
  let counter = 1;

  while (await Product.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

// Calculate discounted price
const calculateDiscountedPrice = (
  price,
  discount_on_product,
  discount_type
) => {
  if (discount_type === "percentage") {
    return price - (price * discount_on_product) / 100;
  } else if (discount_type === "flat") {
    return price - discount_on_product;
  }
  return price;
};

// Add a new product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      short_description,
      description,
      price,
      categories,
      brand_id,
      product_image_gallery,
      product_front_image,
      meta_title,
      meta_description,
      meta_keywords,
      discount_on_product,
      discount_type,
      is_indexed,
      is_in_stock,
      is_featured,
      status,
    } = req.body;

    // Validate required fields
    if (!title || !price || !categories) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, price, or categories",
      });
    }

    const generatedSlug = slug ? slug : await generateUniqueSlug(title);

    const discounted_price = calculateDiscountedPrice(
      price,
      discount_on_product,
      discount_type
    );

    const product = new Product({
      title,
      slug: generatedSlug,
      short_description,
      description,
      price,
      categories,
      brand_id,
      product_image_gallery,
      product_front_image,
      meta_title,
      meta_description,
      meta_keywords,
      discount_on_product,
      discount_type,
      discounted_price,
      is_indexed,
      is_in_stock,
      is_featured,
      status,
    });

    await product.save();
    res.status(201).json({
      success: true,
      data: product,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error.message); // Detailed error logging
    res.status(400).json({ success: false, message: error.message || "Error adding product" });
  }
};


// Update a product
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      slug,
      short_description,
      description,
      price,
      categories,
      brand_id,
      product_image_gallery,
      product_front_image,
      meta_title,
      meta_description,
      meta_keywords,
      discount_on_product,
      discount_type,
      is_indexed,
      is_in_stock,
      is_featured,
      status,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const generatedSlug = slug ? slug : await generateUniqueSlug(title);

    const discounted_price = calculateDiscountedPrice(
      price,
      discount_on_product,
      discount_type
    );

    product.title = title;
    product.slug = generatedSlug;
    product.short_description = short_description;
    product.description = description;
    product.price = price;
    product.categories = categories;
    product.brand_id = brand_id;
    product.product_image_gallery = product_image_gallery;
    product.product_front_image = product_front_image;
    product.meta_title = meta_title;
    product.meta_description = meta_description;
    product.meta_keywords = meta_keywords;
    product.discount_on_product = discount_on_product;
    product.discount_type = discount_type;
    product.discounted_price = discounted_price;
    product.is_indexed = is_indexed;
    product.is_in_stock = is_in_stock;
    product.is_featured = is_featured;
    product.status = status;

    await product.save();

    res.status(200).json({
      success: true,
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ success: false, message: "Error updating product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(400).json({ success: false, message: "Error deleting product" });
  }
};

// Upload product images
const media = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No files uploaded" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const imagePaths = [];

    for (const file of req.files) {
      const imagePath = path.join(
        "../public/images/products",
        req.params.id,
        file.originalname
      );

      const imageObj = {
        type: path.extname(file.originalname).slice(1), 
        alt: file.originalname, 
        path: imagePath,
      };

      imagePaths.push(imageObj);
    }

    product.product_image_gallery = imagePaths;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product images uploaded successfully",
      data: { images: product.product_image_gallery },
    });
  } catch (error) {
    console.error("Error uploading product images:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  media,
};
