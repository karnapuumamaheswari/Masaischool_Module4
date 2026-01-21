# Todo Application - MVC Architecture

A well-structured Todo application built with Express.js following the MVC (Model-View-Controller) architectural pattern.

## Project Structure

```
todoapplication/
├── models/
│   └── Todo.js              # Data models and business logic
├── controllers/
│   └── todoController.js    # Request handlers and response logic
├── routes/
│   └── todoRoutes.js        # API endpoint routes
├── app.js                   # Express server setup
├── package.json             # Project dependencies
└── README.md               # This file
```

## Features

- **MVC Architecture**: Clean separation of concerns with Models, Controllers, and Routes
- **ES Module (ESM)**: Modern JavaScript module syntax using `import`/`export`
- **Error Handling**: Comprehensive try-catch blocks for error management
- **HTTP Status Codes**: Proper status codes for all responses
  - 200: Success (GET, PUT)
  - 201: Created (POST)
  - 400: Bad Request (validation errors)
  - 404: Not Found
  - 500: Internal Server Error
- **Input Validation**: Validates request data before processing
- **In-Memory Storage**: Uses JavaScript array for todo storage (can be replaced with database)

## API Endpoints

### Base URL
```
http://localhost:3000/api/todos
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all todos |
| GET | `/:id` | Get a specific todo by ID |
| POST | `/` | Create a new todo |
| PUT | `/:id` | Update a specific todo |
| DELETE | `/:id` | Delete a specific todo |
| DELETE | `/` | Delete all todos |

## Installation

1. Navigate to the project directory:
```bash
cd todoapplication
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Production Mode
```bash
npm start
```

### Development Mode (with auto-reload)
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Examples

### Create a Todo
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express", "description": "Study Express.js framework"}'
```

### Get All Todos
```bash
curl http://localhost:3000/api/todos
```

### Get a Specific Todo
```bash
curl http://localhost:3000/api/todos/1
```

### Update a Todo
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "completed": true}'
```

### Delete a Todo
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

## Response Format

All responses follow a consistent JSON format:

### Success Response
```json
{
  "success": true,
  "message": "Description of what happened",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Error details"
}
```

## Code Structure

### Models (models/Todo.js)
- Contains the Todo class and data management functions
- Handles in-memory storage and retrieval operations
- Exports functions for CRUD operations

### Controllers (controllers/todoController.js)
- Contains all request handling logic
- Implements error handling with try-catch blocks
- Validates input data
- Returns appropriate HTTP status codes

### Routes (routes/todoRoutes.js)
- Defines all API endpoints
- Maps HTTP methods to controller functions
- Uses Express Router for modular routing

### App (app.js)
- Sets up Express server
- Configures middleware (JSON parsing, logging)
- Mounts routes
- Implements error handling middleware

## Error Handling

The application implements error handling at multiple levels:

1. **Input Validation**: Checks for required fields and data types
2. **Try-Catch Blocks**: Wraps all operations to catch unexpected errors
3. **HTTP Status Codes**: Returns appropriate status codes for different scenarios
4. **Global Error Middleware**: Catches any unhandled errors

## Notes

- This application uses in-memory storage. For production use, integrate a database like MongoDB or PostgreSQL.
- The application uses ES Modules (ESM). Ensure `"type": "module"` is set in package.json.
- All error messages are logged to the console for debugging purposes.

## Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- User authentication
- Todo categories and tags
- Due dates and reminders
- API documentation with Swagger
- Unit and integration tests
- Deployment to cloud platforms
