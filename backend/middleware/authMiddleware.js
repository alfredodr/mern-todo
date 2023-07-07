import jwt from "jsonwebtoken"; //to get the payload from the token, which is the user id
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt; //gets token from the cookie using the cookie parser package

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password"); //gets the userId from the token, not the password

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
}); //is there is a token? is jwt in the token? is it the right token?, if all that is true, then get the user with that token

export { protect };
