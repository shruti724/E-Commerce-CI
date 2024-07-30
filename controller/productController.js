const Product = require("../models/productModel");
const slugify = require("slugify");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
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
      images,
      image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      is_in_stock,
      is_featured,
      status,
    } = req.body;

    const generatedSlug = slug ? slug : await generateUniqueSlug(title);

    const product = new Product({
      title,
      slug: generatedSlug,
      short_description,
      description,
      price,
      categories,
      brand_id,
      images,
      image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
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
    console.error("Error adding product:", error);
    res.status(400).json({ success: false, message: "Error adding product" });
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
      images,
      image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
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

    product.title = title;
    product.slug = generatedSlug;
    product.short_description = short_description;
    product.description = description;
    product.price = price;
    product.categories = categories;
    product.brand_id = brand_id;
    product.images = images;
    product.image_gallery = image_gallery;
    product.meta_title = meta_title;
    product.meta_description = meta_description;
    product.meta_keywords = meta_keywords;
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

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(400).json({ success: false, message: "Error deleting product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
