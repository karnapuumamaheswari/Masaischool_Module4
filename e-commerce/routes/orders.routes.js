const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /orders - Create Order
router.post('/', orderController.createOrder);

// GET /orders - Get All Orders
router.get('/', orderController.getAllOrders);

// DELETE /orders/:orderId - Cancel Order
router.delete('/:orderId', orderController.cancelOrder);

// PATCH /orders/change-status/:orderId - Change Order Status
router.patch('/change-status/:orderId', orderController.changeOrderStatus);

module.exports = router;
