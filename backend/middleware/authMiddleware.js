import jwt from "jsonwebtoken"; //to get the payload from the token, which is the user id
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Get token from headers
    token = req.headers.authorization.split(" ")[1];

    // Decode token to get user ID
    const userId = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from database
    req.user = await User.findById(userId).select("-password");

    next();
  } else {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req?.user && req?.user?.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
