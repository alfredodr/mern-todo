import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

// @desc  Create Todo
//route   POST /api/todos/create
//@access Private
const createTodo = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const { task } = req.body;

  const todoExists = await Todo.findById(_id);

  if (todoExists) {
    res.status(400);
    throw new Error("Todo already exists");
  }

  const newTodo = await Todo.create({
    task,
    userId: _id,
  });

  if (newTodo) {
    res.status(201).json({
      newTodo,
    });
  } else {
    res.status(400);
    throw new Error("Invalid todo data");
  }
});

// @desc  Get all todos
//route   GET /api/todos/all
//@access Private
const getTodos = asyncHandler(async (req, res) => {
  //pagination
  const pageSize = req.query.pageSize || 5;
  const page = Number(req.query.pageNumber) || 1;

  //search
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const { _id } = req.user;

  const todos = await Todo.find({ userId: _id, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  //count
  const count = await Todo.countDocuments({ userId: _id, ...keyword });

  const pages = Math.ceil(count / pageSize);

  let startRange = (page - 1) * pageSize + 1;
  let endRange = Math.min(page * pageSize, count);

  if (todos) {
    res.status(200).json({ todos, page, pages, startRange, endRange, count });
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
    res.status(201).json(todo);
  } else {
    res.status(400);
    throw new Error("Todo not found");
  }
});

// @desc  Udpate a todo
//route   PUT /api/todos/:id
//@access Private
const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { task, status } = req.body;

  const todo = await Todo.findById({ _id: id });

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  todo.task = task || todo.task; //if the task name has changed, update it, otherwise keep the same task name that its in the database
  todo.status = status || todo.status;

  const updatedTodo = await todo.save();

  res.status(200).json({
    updatedTodo,
  });
});

// @desc  Delete a todo
//route   DELETE /api/todos/:id
//@access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById({ _id: id }); //find the todo

  if (todo) {
    await Todo.deleteOne({ _id: todo._id });

    res.status(200).json({ message: "Todo removed" });
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

// @desc  Delete all todos
//route   DELETE /api/todos/deleteAll
//@access Private
const deleteAll = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const todo = await Todo.findOne({ userId: _id }); //find the todos for that user

  if (todo) {
    // delete all todo items of the user
    await Todo.deleteMany({ userId: _id });
    res.status(200).json({ message: "All tasks have been removed" });
  } else {
    res.status(404);
    throw new Error("No task not found");
  }
});

export { createTodo, getTodos, getTodo, updateTodo, deleteTodo, deleteAll };
