# Schema Design Fundamentals – Theory

## 1. What is Schema Design and What Does a Database Schema Represent?

Schema design is the process of **planning and structuring how data will be stored in a relational database**. It defines how tables are created, how they relate to each other, and what rules the data must follow.

A **database schema** represents the logical structure of the database. It includes:
- Tables
- Columns and their data types
- Relationships between tables
- Constraints and rules (like keys and validations)

In simple words, a schema is the **blueprint of the database**, similar to how a building plan is made before construction.

---

## 2. Why Schema Design Is Required Before Writing Backend Code

Schema design must be done before backend development because:
- Backend code depends on how data is stored and retrieved
- APIs, queries, and business logic rely on table structure
- A clear schema avoids confusion during coding

If backend code is written without proper schema design:
- Frequent changes will be needed later
- Code becomes tightly coupled with incorrect data structures
- Bugs and data errors increase

A well-designed schema makes backend development **clean, efficient, and stable**.

---

## 3. Impact of Poor Schema Design

Poor schema design can cause serious problems:

### a) Data Consistency Issues
- Same data stored in multiple places
- Updates in one table may not reflect in others
- Leads to conflicting and incorrect data

### b) Maintenance Problems
- Difficult to modify tables later
- Small changes require updating many tables
- Harder to understand the database structure

### c) Scalability Issues
- Database performance degrades as data grows
- Queries become slow and complex
- Difficult to add new features or modules

Thus, poor schema design increases technical debt and system instability.

---

## 4. Validations in Schema Design and Why Databases Enforce Them

Validations are **rules applied to columns** to ensure data correctness and integrity.

Common validations include:

- **NOT NULL** – ensures a column cannot have empty values  
  Example: `username NOT NULL`

- **UNIQUE** – ensures all values in a column are different  
  Example: `email UNIQUE`

- **DEFAULT** – assigns a default value if none is provided  
  Example: `status DEFAULT 'active'`

- **PRIMARY KEY** – uniquely identifies each row in a table  
  Example: `user_id PRIMARY KEY`

Databases enforce validations to:
- Prevent invalid data entry
- Maintain data integrity
- Reduce errors at the application level

---

## 5. Difference Between a Database Schema and a Database Table

| Database Schema | Database Table |
|-----------------|----------------|
| Overall structure of the database | Stores actual data |
| Defines tables, relationships, and rules | Represents a single entity |
| Logical design | Physical storage |

A schema is the **design**, while a table is a **component within that design**.

---

## 6. Why a Table Should Represent Only One Entity

Each table should represent **one real-world entity** (such as User, Product, Order).

Reasons:
- Avoids data duplication
- Makes tables easier to understand
- Simplifies queries and relationships
- Follows normalization principles

Example:  
User details and order details should not be stored in the same table.

---

## 7. Why Redundant or Derived Data Should Be Avoided

Redundant data means storing the same information multiple times.

Problems with redundant data:
- Increased storage usage
- Inconsistent updates
- Data anomalies

Derived data (data that can be calculated) should also be avoided.

Example:
- Storing `total_price` when it can be calculated from quantity and unit price

Avoiding redundancy ensures **accuracy, efficiency, and consistency**.

---

## 8. Importance of Choosing Correct Data Types

Choosing correct data types is crucial because:
- It improves storage efficiency
- Enhances query performance
- Prevents invalid data entry

Examples:
- Use `INT` for numeric IDs
- Use `VARCHAR` for names
- Use `DATE` for dates
- Use `BOOLEAN` for true/false values

Incorrect data types can lead to:
- Wasted memory
- Slower queries
- Data conversion errors

---

## Conclusion

Schema design is a fundamental step in building reliable relational databases. A well-designed schema ensures data consistency, easy maintenance, better performance, and smooth backend development. Proper validations, correct data types, and clear entity separation are essential for scalable and efficient database systems.
