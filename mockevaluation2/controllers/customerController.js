const supabase = require('../config/supabaseClient');
const { validateCustomerInput } = require('../validations/validators');

// Register a new customer
const registerCustomer = async (req, res) => {
  try {
    const { full_name, email, phone } = req.body;

    // Validate input
    const validation = validateCustomerInput({ full_name, email, phone });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validation.errors
      });
    }

    // Check if email already exists
    const { data: existingCustomer, error: checkError } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Insert new customer
    const { data, error } = await supabase
      .from('customers')
      .insert([
        {
          full_name: full_name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone.trim()
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to register customer',
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Customer registered successfully',
      data: data[0]
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch customers',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Customers retrieved successfully',
      data
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID is required'
      });
    }

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single();

    if (error || !data) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Customer retrieved successfully',
      data
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};

// Delete customer (cascade delete handled at database level)
const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID is required'
      });
    }

    // Check if customer exists
    const { data: customer, error: checkError } = await supabase
      .from('customers')
      .select('id')
      .eq('id', customerId)
      .single();

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Delete customer (orders will be deleted automatically via cascade delete)
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', customerId);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete customer',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Customer and associated orders deleted successfully'
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};

module.exports = {
  registerCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomer
};
