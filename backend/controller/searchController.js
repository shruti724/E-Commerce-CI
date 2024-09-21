const Product = require("../models/productModel"); // Assuming you're searching through products

exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res
        .status(400)
        .json({ success: false, message: "Query must be a non-empty string" });
    }

    // Escape special regex characters
    const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const results = await Product.find({
      $or: [
        { title: { $regex: escapedQuery, $options: "i" } },
        { description: { $regex: escapedQuery, $options: "i" } },
      ],
    });

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
