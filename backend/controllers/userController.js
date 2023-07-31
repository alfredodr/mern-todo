import asyncHandler from "express-async-handler";
import { generateToken, verifyToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import sendEmailReset from "../utils/sendEmailReset.js";
import sendEmailUpdate from "../utils/sendEmailUpdate.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Todo from "../models/todoModel.js";

// @desc  Auth user/set token
//route   POST /api/users/auth
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  //if user exist and password is correct
  if (user && (await user.matchPassword(password))) {
    // generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      provider: user.provider,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password, please try again!");
  }
});

// @desc  Login with OAuth
//route   POST /api/users/oauth
//@access Public
const authWithOAuth = asyncHandler(async (req, res) => {
  const { account, profile } = req.body;

  const userExists = await User.findOne({ email: profile.email });

  //if user exists login and exit
  if (userExists) {
    return res.status(201).json({
      userExists,
    });
  }

  //if there is no user, register, and login
  const newUser = await User.create({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });

  if (newUser) {
    return res.status(201).json({
      newUser,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Register a new user
//route   POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  }

  const token = generateToken({ name, email, password });

  if (token) {
    await sendEmail({
      to: email,
      url: `${process.env.FRONTEND_URL}/verify?token=${token}`,
      text: "VERIFY EMAIL",
    });

    res.status(201).json({
      msg: "Sign up success! Please check your email to complete the registration(don't forget to check spam folder too, in case you can't find the email).",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Verify registered user
//route   GET /api/users/verify
//@access Private
const verifyRegisteredUser = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const { name, email, password } = verifyToken(token);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(201);
    throw new Error("Verification Success!");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(res, user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Update email
//route   PUT /api/users/email
//@access Private
const updateEmail = asyncHandler(async (req, res) => {
  //authenticate by getting the email from the token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Get token from headers
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    // Decode token to get user ID
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const { _id, name, email, role } = data;

    const user = await User.findById({ _id });

    if (user) {
      user.name = name || user.name; //if the user name has changed, update it, otherwise keep the same user name that its in the database
      user.email = email || user.email; //if the user email has changed, update it, otherwise keep the same user email that its in the database
      user.role = role || user.role;

      const updatedUser = await user.save();

      res.status(200).json({
        updatedUser,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  }
});

// @desc  Get user profile
//route   GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc  Get user by email
//route   GET /api/users/email
//@access Private
const getUserByEmail = asyncHandler(async (req, res) => {
  //authenticate by getting the email from the token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Get token from headers
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    // Decode token to get user ID
    const email = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email }).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  }
});

// @desc  Update user profile
//route   PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, role } = req.body;

  const user = await User.findById({ _id });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // user wants to change their email
  if (user.email !== email) {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.status(400);
      throw new Error("Email already taken");
    } else {
      user.email = email; // update the email only after ensuring it's not taken

      const token = generateToken({ _id, name, email, role });

      await sendEmailUpdate({
        to: email,
        url: `${process.env.FRONTEND_URL}/email?token=${token}`,
        text: "VERIFY EMAIL",
      });

      return res.status(201).json({
        msg: "Update success! Please check your email to complete the update (don't forget to check spam folder too, in case you can't find the email).",
      });
    }
  }

  user.name = name || user.name; // if the user name has changed, update it, otherwise keep the same user name that's in the database
  user.role = role || user.role; // same logic applies for the role

  const updatedUser = await user.save();
  res.status(200).json({
    updatedUser,
  });
});

// @desc  Update user profile
//route   PUT /api/users/password
//@access Private
const updateUserPassword = asyncHandler(async (req, res) => {
  const { _id, currentPassword, newPassword, provider } = req.body;

  if (provider !== "credentials") {
    res.status(401);
    throw new Error(
      `This account is signed in with ${provider}. You can't user this function.`
    );
  }

  const user = await User.findById({ _id });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  //if user exist and password is correct
  if (user && currentPassword) {
    await user.matchPassword(currentPassword);
  } else {
    res.status(401);
    throw new Error("Current pasword does not match, please try again");
  }

  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image,
    role: updatedUser.role,
  });
});

// @desc  Get all users
//route   GET /api/users/all
//@access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
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

  //count
  const count = await User.countDocuments({ ...keyword });

  const users = await User.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .select("-password");

  const pages = Math.ceil(count / pageSize);

  let startRange = (page - 1) * pageSize + 1;
  let endRange = Math.min(page * pageSize, count);

  if (users) {
    res.status(200).json({ users, page, pages, startRange, endRange, count });
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

// @desc  Delete user
//route   DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params; //user being deleted
  const { _id } = req.user; //user logged in

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (_id.equals(user._id)) {
    res.status(400);
    throw new Error("You cannot delete the same user you used to login");
  }

  await User.deleteOne({ _id: user._id }); //delete user

  await Todo.deleteMany({ userId: id }); //delete all todos associated to the user

  res
    .status(200)
    .json({ message: "User and associated todos deleted successfully" });
});

// @desc  Get user by id
//route   GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password"); //.select("-password") to not fetch the password
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user
// @route PUT /users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); //find the user with the id from the query parameters

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  } //if there is no user with the id passed as a parameter in our database, we respond with a status of 404 and an error showing "User not found"
});

const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("Email not found");
  }

  // if(user?.provider!=="credentials"){
  //   throw new Error(`This account is signed in with ${user?.provider}. You can't use this function!`)
  // }

  const token = generateToken({ userId: user._id });

  if (token) {
    await sendEmailReset({
      to: email,
      url: `${process.env.FRONTEND_URL}/reset_password?token=${token}`,
      text: "RESET PASSWORD",
    });

    res.status(201).json({
      msg: "Success! Please check your email to reset the password.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Reset Password
//route   PUT /api/users/reset
//@access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const { userId } = verifyToken(token);

  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);

  const user = await User.findByIdAndUpdate(userId, { password: newPassword });

  if (user) {
    res.status(201).json({
      msg: "Password has been reset, please log in",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export {
  authUser,
  authWithOAuth,
  registerUser,
  verifyRegisteredUser,
  getUserProfile,
  getUserByEmail,
  updateUserProfile,
  updateUserPassword,
  updateEmail,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
  requestPasswordReset,
  resetPassword,
};
