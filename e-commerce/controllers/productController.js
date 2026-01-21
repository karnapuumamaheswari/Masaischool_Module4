const { readDB } = require('../db');

// Get All Products
exports.getAllProducts = (req, res) => {
  try {
    const db = readDB();
    const products = db.products;

    res.status(200).json({
      success: true,
      totalProducts: products.length,
      products: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get Product by ID
exports.getProductById = (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    const db = readDB();
    const product = db.products.find(p => p.id === parseInt(productId));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      product: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
