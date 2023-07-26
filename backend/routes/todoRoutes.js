import express from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createTodo);

router.get("/all", protect, getTodos);

router
  .route("/:id")
  .get(protect, getTodo)
  .delete(protect, deleteTodo)
  .put(protect, updateTodo);

export default router;
