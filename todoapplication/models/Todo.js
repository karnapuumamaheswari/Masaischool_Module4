// Todo Model
// In-memory storage for todos (in production, this would be a database)

let todos = [];
let idCounter = 1;

class Todo {
  constructor(id, title, description, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

// Get all todos
export const getAllTodos = () => {
  return todos;
};

// Get a single todo by ID
export const getTodoById = (id) => {
  return todos.find((todo) => todo.id === parseInt(id));
};

// Create a new todo
export const createTodo = (title, description) => {
  const newTodo = new Todo(idCounter++, title, description);
  todos.push(newTodo);
  return newTodo;
};

// Update a todo
export const updateTodo = (id, title, description, completed) => {
  const todo = getTodoById(id);
  if (!todo) {
    return null;
  }
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;
  todo.updatedAt = new Date();
  return todo;
};

// Delete a todo
export const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index === -1) {
    return false;
  }
  todos.splice(index, 1);
  return true;
};

// Delete all todos
export const deleteAllTodos = () => {
  todos = [];
  idCounter = 1;
};
