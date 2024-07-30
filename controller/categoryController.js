const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const slugify = require("slugify");

const getCategories = async (req, res) => {
  try {
    const data = await Category.find({
      isDeleted: false,
    });
    res.status(200).json({
      success: true,
      data,
      message: "Getting categories",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: "Error fetching categories",
      status: 400,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const {
      title,
      slug,
      parent_id,
      product_front_image,
      product_image_gallery,
      is_indexed,
      status,
      isDeleted,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
        status: 400,
      });
    }

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const existingCategory = await Category.findOne({ slug: generatedSlug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
        status: 400,
      });
    }

    const data = new Category({
      title,
      slug: generatedSlug,
      parent_id,
      product_front_image,
      product_image_gallery,
      meta_title: title,
      meta_description: title,
      meta_keywords: title,
      is_indexed,
      status,
      isDeleted: isDeleted || false,
    });
    await data.save();
    res.status(201).json({
      success: true,
      data,
      message: "Category added successfully",
      status: 201,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: "Error adding category",
      status: 400,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      parent_id,
      product_front_image,
      product_image_gallery,
      is_indexed,
      status,
      isDeleted,
    } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
      });
    }

    let generatedSlug = slug ? slugify(slug, { lower: true }) : category.slug;

    if (slug && generatedSlug !== category.slug) {
      const existingCategory = await Category.findOne({ slug: generatedSlug });

      if (existingCategory) {
        const baseSlug = generatedSlug;
        let counter = 1;

        while (await Category.findOne({ slug: generatedSlug })) {
          generatedSlug = `${baseSlug}-${counter}`;
          counter++;
        }
      }
    }

    category.title = title || category.title;
    category.slug = generatedSlug;
    category.parent_id = parent_id || category.parent_id;
    category.product_front_image =
      product_front_image || category.product_front_image;
    category.product_image_gallery =
      product_image_gallery || category.product_image_gallery;
    category.meta_title = title || category.meta_title;
    category.meta_description = title || category.meta_description;
    category.meta_keywords = title || category.meta_keywords;
    category.is_indexed = is_indexed || category.is_indexed;
    category.status = status || category.status;
    category.isDeleted = isDeleted || category.isDeleted;

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: "Error updating category",
      status: 400,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Category.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Category deleted successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: "Error deleting category",
      status: 400,
    });
  }
};

const softDeleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Category.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
        status: 404,
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Category soft deleted successfully",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: "Error soft deleting category",
      status: 400,
    });
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
    const category = await Category.findById(req.params.id).populate('products');
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
  addCategory,
  updateCategory,
  deleteCategory,
  softDeleteById,
  addProductToCategory,
  getCategoryWithProducts,
};
