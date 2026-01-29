require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ Health check: http://localhost:${PORT}/health`);
  console.log(`
API Endpoints:

CUSTOMER ENDPOINTS:
  POST   /api/customers/register          - Register a new customer
  GET    /api/customers/all               - Get all customers
  GET    /api/customers/:customerId       - Get customer by ID
  DELETE /api/customers/:customerId       - Delete customer (cascade deletes orders)

ORDER ENDPOINTS:
  POST   /api/orders/add-order            - Create a new order
  GET    /api/orders/get-my-orders/:customerId - Get customer's orders
  PUT    /api/orders/update-order/:orderId     - Update an order
  DELETE /api/orders/delete-order/:orderId     - Delete an order
  GET    /api/orders/all                 - Get all orders (admin view)
  `);
});

module.exports = app;
