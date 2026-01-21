const { readDB, writeDB } = require('../db');

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Create Order
exports.createOrder = (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid productId or quantity'
      });
    }

    const db = readDB();
    const product = db.products.find(p => p.id === productId);

    // Product not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Stock validation
    if (product.stock === 0) {
      return res.status(400).json({
        success: false,
        message: 'Product out of stock'
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${product.stock}, Requested: ${quantity}`
      });
    }

    // Calculate total amount using revenue formula
    const totalAmount = product.price * quantity;

    // Create order
    const newOrder = {
      id: db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) + 1 : 1,
      productId,
      quantity,
      totalAmount,
      status: 'placed',
      createdAt: getCurrentDate()
    };

    // Reduce product stock
    product.stock -= quantity;

    // Add order to database
    db.orders.push(newOrder);
    writeDB(db);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get All Orders
exports.getAllOrders = (req, res) => {
  try {
    const db = readDB();
    const orders = db.orders;

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Cancel Order (Soft Delete)
exports.cancelOrder = (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    const db = readDB();
    const order = db.orders.find(o => o.id === parseInt(orderId));

    // Order not found
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if already cancelled
    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Order is already cancelled'
      });
    }

    // Cancellation allowed only on the same day
    if (order.createdAt !== getCurrentDate()) {
      return res.status(400).json({
        success: false,
        message: 'Order can only be cancelled on the day it was created'
      });
    }

    // Revert product stock
    const product = db.products.find(p => p.id === order.productId);
    if (product) {
      product.stock += order.quantity;
    }

    // Mark order as cancelled
    order.status = 'cancelled';
    writeDB(db);

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Change Order Status
exports.changeOrderStatus = (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and status are required'
      });
    }

    const validStatuses = ['placed', 'shipped', 'delivered', 'cancelled'];
    const statusFlow = {
      'placed': ['shipped'],
      'shipped': ['delivered'],
      'delivered': [],
      'cancelled': []
    };

    // Validate status
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Valid statuses are: placed, shipped, delivered, cancelled'
      });
    }

    const db = readDB();
    const order = db.orders.find(o => o.id === parseInt(orderId));

    // Order not found
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Cannot change status of cancelled or delivered orders
    if (order.status === 'cancelled' || order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: `Cannot change status of ${order.status} order`
      });
    }

    // Check if status transition is valid
    if (!statusFlow[order.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${order.status} to ${status}. Valid next status: ${statusFlow[order.status].join(', ')}`
      });
    }

    // Update status
    order.status = status;
    writeDB(db);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
