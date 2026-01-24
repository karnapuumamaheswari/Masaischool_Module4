# Database Relationships

## Definition of Database Relationship

A **database relationship** defines how data in one table is connected to data in another table.  
Relationships are created using **primary keys** and **foreign keys** to maintain **data integrity**, avoid **data redundancy**, and enable efficient data retrieval.

In real-world applications like **e-commerce systems**, relationships help represent interactions between customers, products, orders, payments, and more.

---

## Types of Database Relationships

There are three main types of database relationships:

1. One-to-One (1:1)
2. One-to-Many (1:M)
3. Many-to-Many (M:N)

Each type is explained below with an **e-commerce example**.

---

## 1. One-to-One Relationship (1:1)


::contentReference[oaicite:0]{index=0}


### Explanation
In a **one-to-one relationship**, one record in a table is associated with **exactly one** record in another table.

### E-commerce Example
**User ↔ User_Profile**

- Each user has only one profile
- Each profile belongs to only one user

**Tables:**
- `users(user_id, name, email)`
- `user_profiles(profile_id, user_id, address, phone_number)`

Here, `user_id` is a **foreign key** in the `user_profiles` table.

### Usage
- Used when optional or sensitive information is separated
- Improves security and database organization

---

## 2. One-to-Many Relationship (1:M)


::contentReference[oaicite:1]{index=1}


### Explanation
In a **one-to-many relationship**, one record in a table can be associated with **multiple records** in another table.

### E-commerce Example
**Customer ↔ Orders**

- One customer can place many orders
- Each order belongs to one customer

**Tables:**
- `customers(customer_id, name, email)`
- `orders(order_id, customer_id, order_date, total_amount)`

Here, `customer_id` is a **foreign key** in the `orders` table.

### Usage
- Most common relationship type
- Used for customers-orders, categories-products, sellers-products

---

## 3. Many-to-Many Relationship (M:N)


::contentReference[oaicite:2]{index=2}


### Explanation
In a **many-to-many relationship**, multiple records in one table can be associated with multiple records in another table.

This relationship requires a **junction (bridge) table**.

### E-commerce Example
**Orders ↔ Products**

- One order can contain many products
- One product can appear in many orders

**Tables:**
- `orders(order_id, customer_id, order_date)`
- `products(product_id, name, price)`
- `order_items(order_id, product_id, quantity)`

Here, `order_items` acts as a **junction table** containing foreign keys from both tables.

### Usage
- Essential for cart systems
- Used in orders-products, students-courses, users-roles

---

## Summary Table

| Relationship Type | Description | E-commerce Example |
|------------------|------------|--------------------|
| One-to-One | One record ↔ One record | User ↔ Profile |
| One-to-Many | One record ↔ Many records | Customer ↔ Orders |
| Many-to-Many | Many records ↔ Many records | Orders ↔ Products |

---

## Conclusion

Database relationships are essential for designing structured and scalable databases.  
In e-commerce applications, they help manage customers, orders, products, and transactions efficiently while ensuring data consistency and accuracy.
