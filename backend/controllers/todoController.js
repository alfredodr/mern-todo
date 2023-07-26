import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

// @desc  Create Todo
//route   POST /api/todos/create
//@access Private
const createTodo = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { taskName, description, status } = req.body;

  const todoExists = await Todo.findById(_id);

  if (todoExists) {
    res.status(400);
    throw new Error("Todo already exists");
  }

  const newTodo = await Todo.create({
    taskName: taskName,
    description: description,
    status: status,
    userId: _id,
  });

  if (newTodo) {
    return res.status(201).json({
      newTodo,
    });
  } else {
    res.status(400);
    throw new Error("Invalid todo data");
  }
});

// @desc  Get all todos for a user
//route   GET /api/todos/all
//@access Private
const getTodos = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const todos = await Todo.find({ userId: _id });

  if (todos) {
    return res.status(201).json(todos);
  } else {
    res.status(400);
    throw new Error("No todos found");
  }
});

// @desc  Get a specific todo
//route   GET /api/todos/:id
//@access Private
const getTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const todo = await Todo.findOne({
    _id: id,
    userId: _id,
  });

  if (todo) {
    return res.status(201).json(todo);
  } else {
    res.status(400);
    throw new Error("Todo not found");
  }
});

// @desc  Udpate a todo
//route   GET /api/todos/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { taskName, description, status } = req.body;

  const todo = await Todo.findById({ _id: id });

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  todo.taskName = taskName || todo.taskName; //if the task name has changed, update it, otherwise keep the same task name that its in the database
  todo.description = description || todo.description; //if the todo description has changed, update it, otherwise keep the same todo description that its in the database
  todo.status = status || todo.status;

  const updatedTodo = await todo.save();

  res.status(200).json({
    updatedTodo,
  });
});

// @desc  Delete a todo
//route   GET /api/todos/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //   const { _id } = req.user;

  console.log("id", id);

  const todo = await Todo.findById({ _id: id });

  if (todo) {
    await Todo.deleteOne({ _id: todo._id });
    res.status(200).json({ message: "Todo removed" });
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

export { createTodo, getTodos, getTodo, updateTodo, deleteTodo };
