// Todo Routes
// API endpoints for todo operations

import express from "express";
import * as todoController from "../controllers/todoController.js";

const router = express.Router();

// GET all todos
router.get("/", todoController.getTodos);

// GET a single todo by ID
router.get("/:id", todoController.getTodoById);

// POST a new todo
router.post("/", todoController.createTodo);

// PUT update a todo
router.put("/:id", todoController.updateTodo);

// DELETE a todo
router.delete("/:id", todoController.deleteTodo);

// DELETE all todos
router.delete("/", todoController.deleteAllTodos);

export default router;
