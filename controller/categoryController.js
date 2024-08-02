const Category = require("../models/categoryModel");
const slugify = require("slugify");
const path = require("path");
const fs = require("fs");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCategories = await Category.countDocuments();

    res.status(200).json({
      success: true,
      data: categories,
      pagination: {
        total: totalCategories,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCategories / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(400)
      .json({ success: false, message: "Error fetching categories" });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("Error fetching category:", error);
    res
      .status(400)
      .json({ success: false, message: "Error fetching category" });
  }
};

// Generate unique slug
const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true });
  let uniqueSlug = slug;
  let counter = 1;

  while (await Category.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

// Add a new category
const addCategory = async (req, res) => {
  try {
    const {
      title,
      slug,
      parent_id,
      category_front_image,
      category_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
      isDeleted,
    } = req.body;

    const generatedSlug = slug || (await generateUniqueSlug(title));

    const category = new Category({
      title,
      slug: generatedSlug,
      parent_id,
      category_front_image,
      category_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
      isDeleted: isDeleted || false,
    });

    await category.save();
    res.status(201).json({
      success: true,
      data: category,
      message: "Category added successfully",
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(400).json({ success: false, message: "Error adding category" });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  try {
    const {
      title,
      slug,
      parent_id,
      category_front_image,
      category_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
      isDeleted,
    } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const generatedSlug = slug || (await generateUniqueSlug(title));

    category.title = title;
    category.slug = generatedSlug;
    category.parent_id = parent_id;
    category.category_front_image = category_front_image;
    category.category_image_gallery = category_image_gallery;
    category.meta_title = meta_title;
    category.meta_description = meta_description;
    category.meta_keywords = meta_keywords;
    category.is_indexed = is_indexed;
    category.status = status;
    category.isDeleted = isDeleted || false;

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(400)
      .json({ success: false, message: "Error updating category" });
  }
};

// Hard delete a category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(400)
      .json({ success: false, message: "Error deleting category" });
  }
};

// Soft delete a category by marking it as deleted
const softDeleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Category soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting category:", error);
    res
      .status(400)
      .json({ success: false, message: "Error soft deleting category" });
  }
};

// Upload category images
const media = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No files uploaded" });
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const imagePaths = [];

    for (const file of req.files) {
      const imagePath = path.join(
        __dirname,
        "../public/images/categories",
        req.params.id,
        file.originalname
      );

      // Ensure the directory exists
      const dir = path.dirname(imagePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const imageObj = {
        type: file.mimetype.split("/")[1], // Get the file type from mimetype
        alt: file.originalname, // Example value, adjust as needed
        path: imagePath,
      };

      imagePaths.push(imageObj);
    }

    category.category_image_gallery = imagePaths;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category images uploaded successfully",
      data: { images: category.category_image_gallery },
    });
  } catch (error) {
    console.error("Error uploading category images:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const addProductToCategory = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;

    // Debugging: Log input data
    console.log("Input data:", { name, description, price, categoryId });

    const category = await Category.findById(categoryId);
    console.log("Category found:", category);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
      });
    }

    // Ensure the slug is generated
    const slug = slugify(name, { lower: true });
    const existingProduct = await Product.findOne({ slug });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists for another product",
        status: 400,
      });
    }

    const product = new Product({
      title: name,
      slug,
      description,
      price,
      category: categoryId,
    });

    console.log("Product to be saved:", product);

    await product.save();

    console.log("Product saved:", product);

    category.products.push(product._id);

    await category.save();

    console.log("Category updated with new product:", category);

    res.status(201).json({
      success: true,
      data: product,
      message: "Product added and linked to category successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      success: false,
      message: "Error adding product to category",
      status: 400,
      error: error.message,
    });
  }
};

const getCategoryWithProducts = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      data: category,
      message: "Category with products fetched successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching category with products",
      status: 400,
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  softDeleteById,
  addProductToCategory,
  getCategoryWithProducts,
  media,
};
