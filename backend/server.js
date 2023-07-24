import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
const port = process.env.port || 5000;
connectDB();
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //to send form url urlencoded data

//Cookie parser middleware
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
); //to use resources from the frontend url to be accessed by the backend url

app.disable("x-powered-by");

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
