const Brand = require("../models/brandModel");
const slugify = require("slugify");
const path = require("path");
const fs = require("fs");

// Get all brands
const getBrands = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const brands = await Brand.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalBrands = await Brand.countDocuments();

    res.status(200).json({
      success: true,
      data: brands,
      pagination: {
        total: totalBrands,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalBrands / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching Brands:", error);
    res.status(400).json({ success: false, message: "Error fetching Brands" });
  }
};

// Add a new brand
const addBrand = async (req, res) => {
  try {
    const {
      title,
      slug,
      brand_front_image, // Expecting { type, alt, path }
      brand_image_gallery, // Array of objects [{ type, alt, path }]
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
      isDeleted,
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const data = new Brand({
      title,
      slug: generatedSlug,
      brand_front_image,
      brand_image_gallery,
      meta_title,
      meta_description,
      meta_keywords,
      is_indexed,
      status,
      isDeleted: isDeleted || false,
    });

    await data.save();
    res
      .status(201)
      .json({ success: true, data, message: "Brand added successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, data: {}, message: "Error adding brand" });
  }
};

// Update a brand
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
      isDeleted,
    } = req.body;

    const generatedSlug = slug ? slug : slugify(title, { lower: true });

    const data = await Brand.findByIdAndUpdate(
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
        isDeleted: isDeleted || false,
      },
      { new: true }
    );

    if (!data) {
      return res
        .status(404)
        .json({ success: false, data: {}, message: "Brand not found" });
    }

    res
      .status(200)
      .json({ success: true, data, message: "Brand updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, data: {}, message: "Error updating brand" });
  }
};

// Hard delete a brand
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Brand.findByIdAndDelete(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, data: {}, message: "Brand not found" });
    }

    res
      .status(200)
      .json({ success: true, data: {}, message: "Brand deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, data: {}, message: "Error deleting brand" });
  }
};

// Soft delete a brand by marking it as deleted
const softDeleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Brand.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true }
    );

    if (!data) {
      return res
        .status(404)
        .json({ success: false, data: {}, message: "Brand not found" });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Brand soft deleted successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, data: {}, message: "Error soft deleting brand" });
  }
};

// For image upload
const media = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No files uploaded" });
  }

  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    // Processing brand front-image
    if (req.files["brand_front_image"]) {
      const frontImageFile = req.files["brand_front_image"][0];
      const { originalname } = frontImageFile;
      const altText = req.body["brand_front_image[alt]"] || originalname;

      brand.brand_front_image = {
        type: path.extname(originalname).slice(1),
        alt: altText,
        path: path.join("images/brands", req.params.id, originalname),
      };
    }

    // Processing brand image gallery
    if (req.files["brand_image_gallery"]) {
      brand.brand_image_gallery = req.files["brand_image_gallery"].map(
        (file) => {
          const altText =
            req.body[`brand_image_gallery[${file.fieldname}][alt]`] ||
            file.originalname;
          return {
            type: path.extname(file.originalname).slice(1),
            alt: altText,
            path: path.join("images/brands", req.params.id, file.originalname),
          };
        }
      );
    }

    await brand.save();

    res.status(200).json({
      success: true,
      message: "Brand images uploaded successfully",
      data: {
        brand_front_image: brand.brand_front_image,
        brand_image_gallery: brand.brand_image_gallery,
      },
    });
  } catch (error) {
    console.error("Error uploading brand images:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
  softDeleteById,
  media,
};
