import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.port || 5000;
connectDB();
const app = express();

app.use(express.json()); //to parse raw json

app.use(express.urlencoded({ extended: true })); //to send form url urlencoded data

app.use(cookieParser()); //to parse the cookie and use it to protect our routes

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
