const { readDB } = require('../db');

// All Orders with Count using forEach
exports.getAllOrders = (req, res) => {
  try {
    const db = readDB();
    const orders = db.orders;

    let totalCount = 0;
    const orderList = [];

    // Using forEach (Higher-Order Function)
    orders.forEach(order => {
      totalCount++;
      orderList.push(order);
    });

    res.status(200).json({
      success: true,
      totalCount: totalCount,
      orders: orderList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Cancelled Orders with Count using filter
exports.getCancelledOrders = (req, res) => {
  try {
    const db = readDB();
    const orders = db.orders;

    // Using filter (Higher-Order Function)
    const cancelledOrders = orders.filter(order => order.status === 'cancelled');

    res.status(200).json({
      success: true,
      totalCancelledCount: cancelledOrders.length,
      cancelledOrders: cancelledOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Shipped Orders with Count using filter
exports.getShippedOrders = (req, res) => {
  try {
    const db = readDB();
    const orders = db.orders;

    // Using filter (Higher-Order Function)
    const shippedOrders = orders.filter(order => order.status === 'shipped');

    res.status(200).json({
      success: true,
      totalShippedCount: shippedOrders.length,
      shippedOrders: shippedOrders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Total Revenue by Product using filter and reduce
exports.getTotalRevenueByProduct = (req, res) => {
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

    // Product not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Using filter and reduce (Higher-Order Functions)
    const totalRevenue = db.orders
      .filter(order => order.productId === parseInt(productId) && order.status !== 'cancelled')
      .reduce((sum, order) => {
        return sum + (order.quantity * product.price);
      }, 0);

    res.status(200).json({
      success: true,
      productId: parseInt(productId),
      productName: product.name,
      productPrice: product.price,
      totalRevenue: totalRevenue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Overall Total Revenue using filter and reduce
exports.getOverallTotalRevenue = (req, res) => {
  try {
    const db = readDB();

    // Using filter and reduce (Higher-Order Functions)
    const totalRevenue = db.orders
      .filter(order => order.status !== 'cancelled')
      .reduce((sum, order) => {
        return sum + order.totalAmount;
      }, 0);

    res.status(200).json({
      success: true,
      totalRevenue: totalRevenue,
      description: 'Total revenue from all non-cancelled orders'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
