const Brand = require("../models/brandModel");
const slugify = require("slugify");
const path = require("path");
const fs = require("fs");

// Get all brands
const getBrands = async (req, res) => {
  try {
    const data = await Brand.find({

      isDeleted: false
      
    });
    res.status(200).json({success: true, data, message:"Getting the brands",status: 200});
  } catch (error) {
    res.status(400).json({success:false, data:{}, message: "Error fetching brands", status:400});
  }
};

// Add a new brand
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
    res.status(201).json({success:true, data, 
      message: "Brand added successfully",
      status:201
    });
  } catch (error) {
    res.status(400).json({ success:false, data:{}, message: "Error adding brand", status:400 });
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
      return res.status(404).json({success:false, data:{}, message: "Brand not found", status: 404});
    }

    res.status(200).json({success:true, data,
      message: "Brand updated successfully", status:200
      
    });
  } catch (error) {
    res.status(400).json({success:false, data:{}, message: "Error updating brand", status:400 });
  }
};

// Hard delete a brand
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Brand.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({success:false, data:{}, message: "Brand not found", status:404 });
    }

    res.status(200).json({success:true, data:{}, message: "Brand deleted successfully", status: 200 });
  } catch (error) {
    res.status(400).json({success:false, data:{}, message: "Error deleting brand", status:400 });
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
      return res.status(404).json({success:false, data:{}, message: "Brand not found", status: 404 });
    }

    res.status(200).json({success:true, data:{},
      message: "Brand soft deleted successfully",
      status:200
    });
  } catch (error) {
    res.status(400).json({success:false, data:{}, message: "Error soft deleting brand", status:400 });
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

    // Array to hold image paths
    const imagePaths = [];

    // Move each file to the desired location
    for (const file of req.files) {
      const imagePath = path.join(
        "../public/images/brands",
        req.params.id,
        file.originalname
      );
      imagePaths.push(imagePath);
    }

    brand.images = imagePaths;
    await brand.save();

    res.status(200).json({
      success: true,
      message: "Brand images uploaded successfully",
      data: { images: brand.images },
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
  media
};
