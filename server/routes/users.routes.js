const express = require("express");

const catchAsync = require("../utils/catchAsync");
const { signupUser, loginUser } = require("../controllers/users.controllers");
const { loginValidations, signupValidations } = require("../utils/validators");
const { checkExact } = require("express-validator");

const userRouter = express.Router();

userRouter.post(
  "/signup",
  signupValidations,
  checkExact([], { message: "Unknown fields detected" }),
  catchAsync(signupUser)
);
userRouter.post(
  "/login",
  loginValidations,
  checkExact([], { message: "Unknown fields detected" }),
  catchAsync(loginUser)
);

module.exports = userRouter;
