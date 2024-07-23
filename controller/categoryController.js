const Category = require("../models/categoryModel");
const slugify = require("slugify");

const getCategories = async (req, res) => {
  try {
    const data = await Category.find({
      isDeleted:false
    });
    res.status(200).json({success:true, data, message:"Getting categories", status:200});
  } catch (error) {
    res.status(400).json({success:false, data:{}, message: "Error fetching categories", status:400 });
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
      isDeleted
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const data = new Category({
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
      isDeleted: isDeleted || false,
    });
    await data.save();
    res.status(201).json({success:true, data,
      message: "Category added successfully",
      status:201
    });
  } catch (error) {
    res.status(400).json({ success:false, data:{}, message: "Error adding category", status:400 });
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
      isDeleted,
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const data = await Category.findByIdAndUpdate(
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
        isDeleted: isDeleted || false,
      },
      { new: true }
    );
    if (!data) {
      return res.status(404).json({success:false, data:{}, message: "Category not found", status:404 });
    }

    res.status(200).json({success:true, data,
      message: "Category updated successfully",
      status:200
    });
  } catch (error) {
    res.status(400).json({success:false, data:{}, message: "Error updating category", status:400 });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Category.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({success:false, data:{}, message: "Category not found", status:404 });
    }

    res.status(200).json({success:true, data:{}, message: "Category deleted successfully", status:200 });
  } catch (error) {
    res.status(400).json({success:false, data:{}, message: "Error deleting category", status:400});
  }
};

const softDeleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Category.findByIdAndUpdate(
      id,
      { deletedAt: new Date() }, // Mark as deleted
      { new: true }
    );

    if (!data) {
      return res
        .status(404)
        .json({
          success: false,
          data: {},
          message: "Category not found",
          status: 404,
        });
    }

    res
      .status(200)
      .json({
        success: true,
        data: {},
        message: "Category soft deleted successfully",
        status: 200,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        data: {},
        message: "Error soft deleting category",
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
};
