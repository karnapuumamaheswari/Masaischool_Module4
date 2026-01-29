/*
  TEST DATA AND SAMPLE REQUESTS
  Customer-Order Management System
  
  Use these requests in Postman or Thunder Client
  Replace {customerId} and {orderId} with actual UUIDs from your responses
*/

// ============================================
// CUSTOMER ENDPOINTS TESTS
// ============================================

// 1. Register a Customer
// Method: POST
// URL: http://localhost:5000/api/customers/register
// Body:
const registerCustomer1 = {
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
};

// 2. Register Another Customer
const registerCustomer2 = {
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543211"
};

// 3. Get All Customers
// Method: GET
// URL: http://localhost:5000/api/customers/all
// No body needed

// 4. Get Specific Customer
// Method: GET
// URL: http://localhost:5000/api/customers/{customerId}
// Example: http://localhost:5000/api/customers/550e8400-e29b-41d4-a716-446655440000

// ============================================
// ORDER ENDPOINTS TESTS
// ============================================

// 5. Create an Order
// Method: POST
// URL: http://localhost:5000/api/orders/add-order
// Body:
const createOrder1 = {
  "product_name": "Laptop",
  "quantity": 2,
  "price": 999.99,
  "customerId": "{PASTE_CUSTOMER_ID_HERE}"
};

// 6. Create Another Order
const createOrder2 = {
  "product_name": "Mouse",
  "quantity": 5,
  "price": 29.99,
  "customerId": "{PASTE_CUSTOMER_ID_HERE}"
};

// 7. Get Customer's Orders
// Method: GET
// URL: http://localhost:5000/api/orders/get-my-orders/{customerId}

// 8. Get All Orders (Admin View)
// Method: GET
// URL: http://localhost:5000/api/orders/all

// 9. Update an Order
// Method: PUT
// URL: http://localhost:5000/api/orders/update-order/{orderId}
const updateOrder1 = {
  "quantity": 3,
  "price": 1099.99,
  "order_status": "processing"
};

// 10. Update Order Status Only
const updateOrderStatus = {
  "order_status": "shipped"
};

// 11. Delete an Order
// Method: DELETE
// URL: http://localhost:5000/api/orders/delete-order/{orderId}

// ============================================
// CASCADE DELETE TEST
// ============================================

// 12. Delete Customer (This will delete all their orders too!)
// Method: DELETE
// URL: http://localhost:5000/api/customers/{customerId}

// ============================================
// ERROR HANDLING TESTS
// ============================================

// 13. Try registering with invalid email
const invalidEmailRegister = {
  "full_name": "Test User",
  "email": "invalid-email",
  "phone": "9876543212"
};

// 14. Try registering with invalid phone
const invalidPhoneRegister = {
  "full_name": "Test User",
  "email": "test@example.com",
  "phone": "123"
};

// 15. Try registering with duplicate email
const duplicateEmailRegister = {
  "full_name": "Another John",
  "email": "john@example.com",
  "phone": "9876543213"
};

// 16. Try creating order for non-existent customer
const orderNonexistentCustomer = {
  "product_name": "Tablet",
  "quantity": 1,
  "price": 499.99,
  "customerId": "00000000-0000-0000-0000-000000000000"
};

// 17. Try updating non-existent order
// PUT: http://localhost:5000/api/orders/update-order/00000000-0000-0000-0000-000000000000
const updateNonexistentOrder = {
  "quantity": 10
};

// 18. Try getting orders for non-existent customer
// GET: http://localhost:5000/api/orders/get-my-orders/00000000-0000-0000-0000-000000000000

/*
============================================
POSTMAN / THUNDER CLIENT SETUP
============================================

1. Set the base URL in environment variables:
   BASE_URL = http://localhost:5000

2. Create test variables:
   CUSTOMER_ID = (paste actual customer ID)
   ORDER_ID = (paste actual order ID)

3. Update URLs to use variables:
   POST {{BASE_URL}}/api/customers/register
   GET {{BASE_URL}}/api/customers/{{CUSTOMER_ID}}
   POST {{BASE_URL}}/api/orders/add-order
   GET {{BASE_URL}}/api/orders/get-my-orders/{{CUSTOMER_ID}}
   PUT {{BASE_URL}}/api/orders/update-order/{{ORDER_ID}}
   DELETE {{BASE_URL}}/api/orders/delete-order/{{ORDER_ID}}

4. Set request headers:
   Content-Type: application/json

5. Test workflow:
   a. Register customer 1 → save ID
   b. Register customer 2 → save ID
   c. Get all customers
   d. Create order for customer 1 → save order ID
   e. Create order for customer 2
   g. Update order
   h. Delete single order
   i. Delete customer (cascade delete test)
   j. Verify all orders are deleted
*/
