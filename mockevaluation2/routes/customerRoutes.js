const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer
} = require('../controllers/customerController');

// Customer routes
router.post('/register', registerCustomer);
router.get('/all', getAllCustomers);
router.get('/:customerId', getCustomerById);
router.delete('/:customerId', deleteCustomer);

module.exports = router;
