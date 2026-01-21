const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// GET /analytics/allorders - All Orders with Count
router.get('/allorders', analyticsController.getAllOrders);

// GET /analytics/cancelled-orders - Cancelled Orders with Count
router.get('/cancelled-orders', analyticsController.getCancelledOrders);

// GET /analytics/shipped - Shipped Orders with Count
router.get('/shipped', analyticsController.getShippedOrders);

// GET /analytics/total-revenue/:productId - Total Revenue by Product
router.get('/total-revenue/:productId', analyticsController.getTotalRevenueByProduct);

// GET /analytics/alltotalrevenue - Overall Total Revenue
router.get('/alltotalrevenue', analyticsController.getOverallTotalRevenue);

module.exports = router;
