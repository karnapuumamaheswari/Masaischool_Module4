// Validation functions for Customer data
const validateCustomerInput = (data) => {
  const errors = [];

  // Validate full_name
  if (!data.full_name || typeof data.full_name !== 'string' || data.full_name.trim() === '') {
    errors.push('full_name is required and must be a non-empty string');
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Valid email is required');
  }

  // Validate phone
  const phoneRegex = /^[0-9]{10}$/;
  if (!data.phone || !phoneRegex.test(data.phone.replace(/[^0-9]/g, ''))) {
    errors.push('Valid phone number (10 digits) is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation functions for Order data
const validateOrderInput = (data) => {
  const errors = [];

  // Validate product_name
  if (!data.product_name || typeof data.product_name !== 'string' || data.product_name.trim() === '') {
    errors.push('product_name is required and must be a non-empty string');
  }

  // Validate quantity
  if (!data.quantity || !Number.isInteger(data.quantity) || data.quantity <= 0) {
    errors.push('quantity is required and must be a positive integer');
  }

  // Validate price
  if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
    errors.push('price is required and must be a positive number');
  }

  // Validate customerId
  if (!data.customerId || typeof data.customerId !== 'string') {
    errors.push('customerId is required and must be a valid UUID');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Validation for order update
const validateOrderUpdate = (data) => {
  const errors = [];

  // Validate quantity if provided
  if (data.quantity !== undefined) {
    if (!Number.isInteger(data.quantity) || data.quantity <= 0) {
      errors.push('quantity must be a positive integer');
    }
  }

  // Validate price if provided
  if (data.price !== undefined) {
    if (typeof data.price !== 'number' || data.price <= 0) {
      errors.push('price must be a positive number');
    }
  }

  // Validate order_status if provided
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (data.order_status && !validStatuses.includes(data.order_status)) {
    errors.push(`order_status must be one of: ${validStatuses.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateCustomerInput,
  validateOrderInput,
  validateOrderUpdate
};
