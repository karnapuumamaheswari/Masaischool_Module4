# Customer-Order Management System

A backend system for managing customers and orders with proper relational database design, foreign keys, and cascade delete functionality.

## Features

✅ **Relational Database Design** - Two related tables (Customers & Orders) with proper foreign key relationships  
✅ **Customer Registration** - Register customers with validation  
✅ **Order CRUD Operations** - Create, read, update, and delete orders  
✅ **Cascade Delete** - Automatically delete orders when a customer is deleted  
✅ **Input Validation** - Comprehensive validation for all inputs  
✅ **Error Handling** - Clear error messages with appropriate HTTP status codes  
✅ **RESTful API** - Clean and organized API endpoints  

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase (PostgreSQL)** - Database
- **Dotenv** - Environment variables
- **CORS** - Cross-origin requests

## Project Structure

```
├── app.js                          # Main application entry point
├── package.json                    # Dependencies
├── .env                            # Environment variables
├── config/
│   └── supabaseClient.js           # Supabase connection setup
├── controllers/
│   ├── customerController.js       # Customer business logic
│   └── orderController.js          # Order business logic
├── routes/
│   ├── customerRoutes.js           # Customer API routes
│   └── orderRoutes.js              # Order API routes
├── validations/
│   └── validators.js               # Input validation functions
└── README.md                       # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mockevaluation2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env` file and add your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   PORT=5000
   ```

4. **Create database tables in Supabase**

   Run the following SQL in your Supabase SQL Editor:

   ```sql
   -- Create Customers table
   CREATE TABLE customers (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     full_name TEXT NOT NULL,
     email TEXT NOT NULL UNIQUE,
     phone TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create Orders table with foreign key
   CREATE TABLE orders (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     product_name TEXT NOT NULL,
     quantity INTEGER NOT NULL CHECK (quantity > 0),
     price NUMERIC NOT NULL CHECK (price > 0),
     order_status TEXT DEFAULT 'pending',
     customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Create indexes for better query performance
   CREATE INDEX idx_orders_customer_id ON orders(customer_id);
   CREATE INDEX idx_customers_email ON customers(email);
   ```

5. **Start the server**
   ```bash
   # Development with auto-reload
   npm run dev

   # Production
   npm start
   ```

   Server will run on `http://localhost:5000`

## API Documentation

### Health Check
```
GET /health
```
Returns server status.

---

### Customer Endpoints

#### Register a Customer
```
POST /api/customers/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Customer registered successfully",
  "data": {
    "id": "uuid",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "created_at": "timestamp"
  }
}
```

#### Get All Customers
```
GET /api/customers/all
```

#### Get Customer by ID
```
GET /api/customers/:customerId
```

#### Delete Customer (Cascade Delete)
```
DELETE /api/customers/:customerId
```

---

### Order Endpoints

#### Create an Order
```
POST /api/orders/add-order
Content-Type: application/json

{
  "product_name": "Laptop",
  "quantity": 2,
  "price": 999.99,
  "customerId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "uuid",
    "product_name": "Laptop",
    "quantity": 2,
    "price": 999.99,
    "order_status": "pending",
    "customer_id": "uuid",
    "created_at": "timestamp"
  }
}
```

#### Get Customer's Orders
```
GET /api/orders/get-my-orders/:customerId
```

#### Update an Order
```
PUT /api/orders/update-order/:orderId
Content-Type: application/json

{
  "quantity": 3,
  "price": 1099.99,
  "order_status": "processing"
}
```

Updateable fields:
- `quantity` (positive integer)
- `price` (positive number)
- `order_status` (pending, processing, shipped, delivered, cancelled)

#### Delete an Order
```
DELETE /api/orders/delete-order/:orderId
```

#### Get All Orders (Admin View)
```
GET /api/orders/all
```

---

## Error Handling

The API returns appropriate HTTP status codes:

- **200** - Success
- **201** - Created
- **400** - Bad Request (validation error)
- **404** - Not Found
- **409** - Conflict (e.g., duplicate email)
- **500** - Internal Server Error

Error Response Format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

---

## Validation Rules

### Customer Registration
- `full_name`: Required, non-empty string
- `email`: Required, valid email format, must be unique
- `phone`: Required, 10 digits

### Order Creation
- `product_name`: Required, non-empty string
- `quantity`: Required, positive integer
- `price`: Required, positive number
- `customerId`: Required, valid UUID

### Order Update
- `quantity`: Positive integer (optional)
- `price`: Positive number (optional)
- `order_status`: One of (pending, processing, shipped, delivered, cancelled) (optional)

---

## Database Design

### Customers Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| full_name | TEXT | NOT NULL |
| email | TEXT | NOT NULL, UNIQUE |
| phone | TEXT | NOT NULL |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Orders Table
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| product_name | TEXT | NOT NULL |
| quantity | INTEGER | NOT NULL, CHECK > 0 |
| price | NUMERIC | NOT NULL, CHECK > 0 |
| order_status | TEXT | DEFAULT 'pending' |
| customer_id | UUID | FOREIGN KEY → customers.id, ON DELETE CASCADE |
| created_at | TIMESTAMP | DEFAULT NOW() |

---

## Cascade Delete Behavior

When a customer is deleted:
1. All orders belonging to that customer are automatically deleted
2. This is enforced at the database level using `ON DELETE CASCADE`
3. No manual deletion of orders is required

---

## Testing with Postman/Thunder Client

1. Import the API endpoints into Postman
2. Set base URL: `http://localhost:5000`
3. Test the endpoints with the request examples above

---

## Future Enhancements

- Authentication & Authorization (JWT)
- Order pagination
- Advanced filtering and searching
- Notification system
- Payment integration
- Email verification for customers

---

## License

MIT License
