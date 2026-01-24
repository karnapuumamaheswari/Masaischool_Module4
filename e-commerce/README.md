# E-commerce Orders & Analytics API

A RESTful E-commerce backend built with Node.js and Express.js for managing orders, product stock, and analytics with Higher-Order JavaScript functions.

## Features

- ✅ Orders lifecycle management (Create, Read, Cancel, Status Update)
- ✅ Product stock management with automatic deduction
- ✅ Advanced Analytics using Higher-Order Functions (map, forEach, filter, reduce)
- ✅ Local JSON database (db.json) - No external database required
- ✅ Proper error handling and validation
- ✅ RESTful API with Express Routers

## Technology Stack

- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **JSON** - Local Database

## Project Structure

```
e-commerce/
├── app.js                 # Main application file
├── package.json          # Dependencies
├── db.json              # Local database
├── db.js                # Database utility functions
├── routes/
│   ├── products.routes.js    # Product routes
│   ├── orders.routes.js      # Order routes
│   └── analytics.routes.js   # Analytics routes
├── controllers/
│   ├── productController.js   # Product logic
│   ├── orderController.js     # Order logic
│   └── analyticsController.js # Analytics logic
└── utils/               # Utility functions
```

## Database Schema

### Products
```json
{
  "id": 1,
  "name": "Mobile",
  "price": 20000,
  "stock": 15
}
```

### Orders
```json
{
  "id": 1,
  "productId": 1,
  "quantity": 3,
  "totalAmount": 60000,
  "status": "placed",
  "createdAt": "2026-01-18"
}
```

## API Endpoints

### Products APIs

#### Get All Products
```
GET /products
```

#### Get Product by ID
```
GET /products/:productId
```

### Orders APIs

#### Create Order
```
POST /orders
Body: { "productId": 1, "quantity": 3 }
Status: 201 Created | 400 Bad Request | 404 Not Found
Rules:
- Calculates totalAmount using revenue formula
- Reduces product stock on successful order
- Rejects if product stock is 0 or insufficient
```

#### Get All Orders
```
GET /orders
Status: 200 OK
```

#### Cancel Order (Soft Delete)
```
DELETE /orders/:orderId
Status: 200 OK | 400 Bad Request | 404 Not Found
Rules:
- Does NOT hard delete, only changes status to 'cancelled'
- Only cancellable on the same day order was created
- Reverts product stock after cancellation
- Cannot cancel already cancelled orders
```

#### Change Order Status
```
PATCH /orders/change-status/:orderId
Body: { "status": "shipped" }
Status: 200 OK | 400 Bad Request | 404 Not Found
Rules:
- Valid Status Flow: placed → shipped → delivered
- Cannot skip status
- Cannot change status of cancelled or delivered orders
```

### Analytics APIs (Using Higher-Order Functions)

#### All Orders with Count
```
GET /analytics/allorders
Uses: forEach
Returns: Total count and list of all orders
```

#### Cancelled Orders with Count
```
GET /analytics/cancelled-orders
Uses: filter
Returns: Count and list of cancelled orders
```

#### Shipped Orders with Count
```
GET /analytics/shipped
Uses: filter
Returns: Count and list of shipped orders
```

#### Total Revenue by Product
```
GET /analytics/total-revenue/:productId
Uses: filter, reduce
Logic: Filters by productId and excludes cancelled orders
Formula: totalRevenue = Σ (order.quantity × product.price)
```

#### Overall Total Revenue
```
GET /analytics/alltotalrevenue
Uses: filter, reduce
Logic: Excludes cancelled orders and sums all revenues
Formula: totalRevenue = Σ (order.quantity × product.price)
```

## Installation

1. **Clone or extract the project**
   ```bash
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   Or with nodemon (auto-restart on file changes):
   ```bash
   npm run dev
   ```

4. **Access the API**
   - Server runs on `http://localhost:5000`
   - Root endpoint: `http://localhost:5000/`

## Usage Examples

### Create a Product (already in db.json)
Products are pre-populated in db.json

### Create an Order
```bash
curl -X POST http://localhost:5000/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

### Get All Orders
```bash
curl http://localhost:5000/orders
```

### Cancel an Order
```bash
curl -X DELETE http://localhost:5000/orders/1
```

### Change Order Status
```bash
curl -X PATCH http://localhost:5000/orders/change-status/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

### Get Analytics
```bash
# All orders
curl http://localhost:5000/analytics/allorders

# Cancelled orders
curl http://localhost:5000/analytics/cancelled-orders

# Shipped orders
curl http://localhost:5000/analytics/shipped

# Revenue for product 1
curl http://localhost:5000/analytics/total-revenue/1

# Overall revenue
curl http://localhost:5000/analytics/alltotalrevenue
```

## Coding Standards

✅ **Higher-Order Functions Used**
- `map` - Transform data
- `forEach` - Iterate and count
- `filter` - Extract specific orders
- `reduce` - Calculate totals

❌ **Avoided**
- for loops
- while loops
- Traditional iteration

## Error Handling

All endpoints return consistent JSON responses:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Status Codes

- `200 OK` - Successful GET/PATCH/DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid input or business logic error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Edge Cases Handled

✅ Insufficient product stock  
✅ Product not found  
✅ Invalid order cancellation (already cancelled or different day)  
✅ Invalid status transitions  
✅ Cancelled orders excluded from revenue calculations  
✅ Stock reversion on order cancellation  

## Notes

- All data is persisted in `db.json`
- No external database required
- Server automatically assigns order IDs
- Dates are stored in YYYY-MM-DD format
- Order cancellation only allowed on the same day

## Future Enhancements

- User authentication
- Multiple payment methods
- Shipping integration
- Email notifications
- Order history filtering

---

**Author:** E-commerce Team  
**Version:** 1.0.0  
**Last Updated:** 2026-01-21
