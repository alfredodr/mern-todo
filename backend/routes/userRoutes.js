import express from "express";
import {
  authUser,
  authWithOAuth,
  registerUser,
  verifyRegisteredUser,
  getUserProfile,
  getUserByEmail,
  updateUserProfile,
  updateUserPassword,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);

router.get("/all", protect, admin, getAllUsers);

router.get("/verify", verifyRegisteredUser);

router.post("/auth", authUser);

router.post("/oauth", authWithOAuth);

router.put("/request", requestPasswordReset);

router.put("/reset", resetPassword);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put("/password", protect, updateUserPassword);

router.get("/email", getUserByEmail); //protected without using the middlware because it gets the email, not the user id

router
  .route("/:id")
  .get(admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(admin, updateUser);

export default router;
