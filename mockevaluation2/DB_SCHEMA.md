# Supabase SQL Schema Setup

Run this SQL in your Supabase SQL Editor to set up the database schema for the Customer-Order Management System.

## 1. Create Customers Table

```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 2. Create Orders Table with Foreign Key

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price NUMERIC NOT NULL CHECK (price > 0),
  order_status TEXT DEFAULT 'pending',
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 3. Create Indexes for Performance

```sql
-- Index for customer lookups in orders
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- Index for email lookups
CREATE INDEX idx_customers_email ON customers(email);
```

## 4. Enable Row Level Security (Optional but Recommended)

```sql
-- Enable RLS on customers table
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Enable RLS on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust as needed for your use case)
CREATE POLICY "Allow read access to all customers" ON customers
  FOR SELECT USING (true);

CREATE POLICY "Allow read access to all orders" ON orders
  FOR SELECT USING (true);
```

## 5. Sample Data (for testing)

```sql
-- Insert test customers
INSERT INTO customers (full_name, email, phone) VALUES
('John Doe', 'john@example.com', '9876543210'),
('Jane Smith', 'jane@example.com', '9876543211'),
('Bob Johnson', 'bob@example.com', '9876543212');

-- Insert test orders
INSERT INTO orders (product_name, quantity, price, customer_id, order_status) 
VALUES
('Laptop', 1, 999.99, (SELECT id FROM customers WHERE email = 'john@example.com'), 'pending'),
('Mouse', 2, 29.99, (SELECT id FROM customers WHERE email = 'jane@example.com'), 'shipped'),
('Keyboard', 1, 79.99, (SELECT id FROM customers WHERE email = 'bob@example.com'), 'delivered');
```

## Important Notes

⚠️ **CASCADE DELETE**: When a customer is deleted, all their orders are automatically deleted due to the `ON DELETE CASCADE` constraint on the foreign key.

✅ **Validation**: The CHECK constraints ensure:
- Quantity is always positive
- Price is always positive

✅ **Uniqueness**: The UNIQUE constraint on email prevents duplicate registrations.

## Verify Your Setup

```sql
-- Check customers table structure
\d customers

-- Check orders table structure
\d orders

-- List all foreign keys
SELECT constraint_name, table_name, column_name 
FROM information_schema.key_column_usage 
WHERE constraint_name LIKE '%fk%';
```
