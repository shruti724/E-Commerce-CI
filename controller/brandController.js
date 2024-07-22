// createBrand, getBrands, updateBrand, deleteBrand;
const Brand = require("../models/brandModel");
const slugify = require("slugify");

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ message: "Error fetching brands", error });
  }
};

const addBrand = async (req, res) => {
  try {
    const {
      title,
      slug,
      brand_front_image,
      brand_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const newBrand = new Brand({
      title,
      slug: generatedSlug,
      brand_front_image,
      brand_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
    });
    await newBrand.save();
    res.status(201).json({
      message: "Brand added successfully",
      category: newBrand,
    });
  } catch (error) {
    res.status(400).json({ message: "Error adding brand", error });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      brand_front_image,
      brand_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const brand = await brand.findByIdAndUpdate(
      id,
      {
        title,
        slug: generatedSlug,
        brand_front_image,
        brand_image_gallery,
        meta_title,
        meta_description,
        meta_keywords,
        is_indexed,
        status,
      },
      { new: true }
    );
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand updated successfully",
      brand,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating category", error });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting brand", error });
  }
};

module.exports = {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
};
