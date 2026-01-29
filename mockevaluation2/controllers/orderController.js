const supabase = require('../config/supabaseClient');
const { validateOrderInput, validateOrderUpdate } = require('../validations/validators');

// Create a new order for a customer
const addOrder = async (req, res) => {
  try {
    const { product_name, quantity, price, customerId } = req.body;

    // Validate input
    const validation = validateOrderInput({ product_name, quantity, price, customerId });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validation.errors
      });
    }

    // Check if customer exists
    const { data: customer, error: customerCheckError } = await supabase
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

    // Create order
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          product_name: product_name.trim(),
          quantity: parseInt(quantity),
          price: parseFloat(price),
          customer_id: customerId,
          order_status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create order',
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
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

// Get all orders for a specific customer
const getMyOrders = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID is required'
      });
    }

    // Check if customer exists
    const { data: customer, error: customerCheckError } = await supabase
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

    // Get all orders for the customer
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
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

// Update an order
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { quantity, price, order_status } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Validate update input
    const validation = validateOrderUpdate({ quantity, price, order_status });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validation.errors
      });
    }

    // Check if order exists
    const { data: order, error: checkError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .single();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Prepare update object
    const updateData = {};
    if (quantity !== undefined) updateData.quantity = parseInt(quantity);
    if (price !== undefined) updateData.price = parseFloat(price);
    if (order_status !== undefined) updateData.order_status = order_status;

    // Update order
    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update order',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
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

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required'
      });
    }

    // Check if order exists
    const { data: order, error: checkError } = await supabase
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .single();

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Delete order
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
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

// Get all orders (admin view)
const getAllOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        id,
        product_name,
        quantity,
        price,
        order_status,
        created_at,
        customers(id, full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'All orders retrieved successfully',
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

module.exports = {
  addOrder,
  getMyOrders,
  updateOrder,
  deleteOrder,
  getAllOrders
};
