// Todo Controller
// Business logic and request/response handling

import * as TodoModel from "../models/Todo.js";

// Get all todos
export const getTodos = (req, res) => {
  try {
    const todos = TodoModel.getAllTodos();
    res.status(200).json({
      success: true,
      message: "Todos retrieved successfully",
      data: todos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single todo by ID
export const getTodoById = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Todo ID is required",
      });
    }

    const todo = TodoModel.getTodoById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo retrieved successfully",
      data: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Create a new todo
export const createTodo = (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title is required and cannot be empty",
      });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Description is required and cannot be empty",
      });
    }

    const newTodo = TodoModel.createTodo(title.trim(), description.trim());

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update a todo
export const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Todo ID is required",
      });
    }

    const updatedTodo = TodoModel.updateTodo(id, title, description, completed);

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a todo
export const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Todo ID is required",
      });
    }

    const isDeleted = TodoModel.deleteTodo(id);

    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete all todos
export const deleteAllTodos = (req, res) => {
  try {
    TodoModel.deleteAllTodos();

    res.status(200).json({
      success: true,
      message: "All todos deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting all todos:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
