const express = require('express');
const app = express();
const ordersRoutes = require('./routes/orders.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const productsRoutes = require('./routes/products.routes');

const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/orders', ordersRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/products', productsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to E-commerce Orders & Analytics API',
    version: '1.0.0',
    endpoints: {
      products: '/products',
      orders: '/orders',
      analytics: '/analytics'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`✅ E-commerce API Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   Products: GET http://localhost:${PORT}/products`);
  console.log(`   Orders: POST/GET/DELETE http://localhost:${PORT}/orders`);
  console.log(`   Analytics: GET http://localhost:${PORT}/analytics/*`);
});
