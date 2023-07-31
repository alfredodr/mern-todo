import express from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
  deleteAll,
} from "../controllers/todoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createTodo);

router.get("/all", protect, getTodos);

router.delete("/deleteAll", protect, deleteAll);

router
  .route("/:id")
  .get(protect, getTodo)
  .delete(protect, deleteTodo)
  .put(protect, updateTodo);

export default router;
