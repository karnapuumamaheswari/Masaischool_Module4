const express = require('express');
const router = express.Router();
const {
  addOrder,
  getMyOrders,
  updateOrder,
  deleteOrder,
  getAllOrders
} = require('../controllers/orderController');

// Order routes
router.post('/add-order', addOrder);
router.get('/get-my-orders/:customerId', getMyOrders);
router.put('/update-order/:orderId', updateOrder);
router.delete('/delete-order/:orderId', deleteOrder);
router.get('/all', getAllOrders);

module.exports = router;
