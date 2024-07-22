const Category = require("../models/categoryModel");
const slugify = require("slugify");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: "Error fetching categories", error });
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
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const newCategory = new Category({
      title,
      slug: generatedSlug,
      parent_id,
      product_front_image,
      product_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
    });
    await newCategory.save();
    res.status(201).json({
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding category", error });
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
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const category = await Category.findByIdAndUpdate(
      id,
      {
        title,
        slug: generatedSlug,
        parent_id,
        product_front_image,
        product_image_gallery,
        meta_title,
        meta_description,
        meta_keywords,
        is_indexed,
        status,
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating category", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting category", error });
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
